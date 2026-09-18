#!/usr/bin/env python3
"""Backend for Creator Darwinism OS beta applications."""
import sqlite3
import json
import hashlib
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

DB_PATH = "/home/user/workspace/beta-apply/applications.db"
ADMIN_HASH = hashlib.sha256(b"darwinism2026").hexdigest()

def get_db():
    db = sqlite3.connect(DB_PATH, check_same_thread=False)
    db.row_factory = sqlite3.Row
    db.execute("""CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        platform TEXT,
        profile_url TEXT,
        has_product TEXT,
        product_detail TEXT,
        known_for TEXT,
        wound TEXT,
        why_now TEXT,
        created_at TEXT DEFAULT (datetime('now')),
        status TEXT DEFAULT 'new',
        notes TEXT DEFAULT ''
    )""")
    db.commit()
    return db

db = get_db()

@asynccontextmanager
async def lifespan(app):
    yield
    db.close()

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class Application(BaseModel):
    name: str
    email: str
    platform: str = ""
    profile_url: str = ""
    has_product: str = ""
    product_detail: str = ""
    known_for: str = ""
    wound: str = ""
    why_now: str = ""

@app.post("/api/apply", status_code=201)
def submit_application(app_data: Application):
    # Check for duplicate email
    existing = db.execute("SELECT id FROM applications WHERE email = ?", [app_data.email]).fetchone()
    if existing:
        return {"status": "duplicate", "message": "You've already applied. We'll be in touch."}

    db.execute(
        """INSERT INTO applications (name, email, platform, profile_url, has_product, product_detail, known_for, wound, why_now)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        [app_data.name, app_data.email, app_data.platform, app_data.profile_url,
         app_data.has_product, app_data.product_detail, app_data.known_for, app_data.wound, app_data.why_now]
    )
    db.commit()
    return {"status": "success", "message": "Application received."}

@app.get("/api/applications")
def list_applications(password: str = ""):
    if hashlib.sha256(password.encode()).hexdigest() != ADMIN_HASH:
        return Response(status_code=401, content="Unauthorized")
    rows = db.execute("SELECT * FROM applications ORDER BY created_at DESC").fetchall()
    return [dict(r) for r in rows]

def send_acceptance_email(name, email):
    """Send acceptance email via Gmail SMTP."""
    first_name = name.split()[0] if name else "there"

    subject = "You're in: Creator Darwinism OS Beta"
    body = f"""Hey {first_name},

Thank you for applying. You're in.

I'm building this with a small group of people who are willing to be honest about what works and what doesn't. You're one of them now.

Here's your login to get started:
https://creatordarwinism.ai/login

Go through the Archetype Navigator first. Then the Golden Offer Experience. Then the Stress Test.

If something breaks or confuses you, tell me. That's the whole point of this phase.

Thank you for building this with me.

Ashley"""

    msg = MIMEMultipart()
    msg["From"] = "hello@ashleyrudder.com"
    msg["To"] = email
    msg["Subject"] = subject
    msg["Reply-To"] = "hello@ashleyrudder.com"
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login("hello@ashleyrudder.com", GMAIL_APP_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"Email failed for {email}: {e}")
        return False

# Gmail App Password - set via environment or hardcode temporarily
import os
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "")

@app.post("/api/applications/{app_id}/status")
def update_status(app_id: int, password: str = "", new_status: str = ""):
    if hashlib.sha256(password.encode()).hexdigest() != ADMIN_HASH:
        return Response(status_code=401, content="Unauthorized")
    db.execute("UPDATE applications SET status = ? WHERE id = ?", [new_status, app_id])
    db.commit()

    result = {"updated": app_id, "status": new_status}

    # Send acceptance email when status changes to accepted
    if new_status == "accepted":
        row = db.execute("SELECT name, email FROM applications WHERE id = ?", [app_id]).fetchone()
        if row:
            if GMAIL_APP_PASSWORD:
                sent = send_acceptance_email(row["name"], row["email"])
                result["email_sent"] = sent
            else:
                result["email_sent"] = False
                result["email_note"] = "Gmail app password not configured. Email not sent."
            result["name"] = row["name"]
            result["email"] = row["email"]

    return result

@app.post("/api/applications/{app_id}/notes")
def update_notes(app_id: int, password: str = "", note: str = ""):
    if hashlib.sha256(password.encode()).hexdigest() != ADMIN_HASH:
        return Response(status_code=401, content="Unauthorized")
    db.execute("UPDATE applications SET notes = ? WHERE id = ?", [note, app_id])
    db.commit()
    return {"updated": app_id}

@app.get("/api/export")
def export_csv(password: str = ""):
    if hashlib.sha256(password.encode()).hexdigest() != ADMIN_HASH:
        return Response(status_code=401, content="Unauthorized")
    rows = db.execute("SELECT * FROM applications ORDER BY created_at DESC").fetchall()
    import csv
    import io
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Name", "Email", "Platform", "Profile", "Has Product", "Product Detail", "Known For", "Wound", "Why Now", "Applied", "Status", "Notes"])
    for r in rows:
        writer.writerow([r["id"], r["name"], r["email"], r["platform"], r["profile_url"], r["has_product"], r["product_detail"], r["known_for"], r["wound"], r["why_now"], r["created_at"], r["status"], r["notes"]])
    return Response(content=output.getvalue(), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=beta_applications.csv"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
