# CDOS — Creator Darwinism OS

The program, the product, the buildout.
Home: chatwise-thought-hub (private repo, Lovable-built, Supabase project wjhvuumhcibzlnfbayes). Thread: CDOS Buildout (pinned).
Payments and Onboarding desk: Sable, branch claude/payments-desk. This file is the desk charter. Updated after every working session.

## Where it stands (verified in the repo 9/18, payments desk first pass)

The product is live code: Vite + React + Capacitor app, Supabase edge functions, bot chat, IP Vault, reports.

The money path, as the code actually runs it:
1. Tier cards on Index and Login open the tier's stan_product_url from the Tiers config. An empty URL silently routes to /login instead of checkout. Displayed price is display only. Stan Store sets the real charge.
2. Stan Store never calls the app. Zapier listens to Stan events and POSTs to stan-store-webhook with a Bearer secret read from app_settings (stan_store_webhook_secret).
3. The webhook validates the secret, requires email plus a tier_key in tier_single, tier_monthly, tier_power, tier_ultra, then upserts paid_users on purchase_email with active true.
4. AuthGuard blocks every non-admin without an active paid_users row and routes them to /verify-purchase. Same-email buyers auto-link. Different-email buyers type their Stan email and claim-purchase (service role) links them, refusing rows claimed by another account.
5. Onboarding gate follows payment. Then dashboard and chat.
Parallel comp rail: /vip slug or code, claim-vip seeds a paid_users row (tier from vip_access config), one claim per user, Resend email alert to Ashley on each claim.

Onboarding, as the code actually runs it: Archetype Navigator chat. Name, three blocks (content world, identity and monetization, personal story), insight beats between blocks, mid-flow archetype teaser, tap-to-reveal final sequence, bot choice (Golden Offer Interview or Pressure Test), then one-shot profile save and route to chat. Copy lives in three layers: hardcoded strings in OnboardingChat.tsx, onboardingData.ts, and the onboarding_copy DB table which overrides without a deploy.

## Open loops

1. Payments: no live monetization yet. Gaps named in the 9/18 money map: Stan products unverified, Zapier zap and webhook secret unverifiable from code, claim flow never run end to end, price unruled.
2. Credits seam to verify before launch: VerifyPurchase syncs user_credits only on the manual claim path and only where a credits row already exists. First-time onboarding inserts a free-tier row with sessions_limit 1. Unless a signup trigger creates credits earlier, a paying buyer can land with free-tier credits. Needs one test purchase or a dashboard read to confirm.
3. Supabase MCP in this session reaches project ohgcayvyvwtybdoswpox only, not wjhvuumhcibzlnfbayes. Live checks of tier URLs, webhook secret existence, and paid_users rows need dashboard eyes or a connector scoped to the Lovable project.
4. Onboarding: Ashley-led copy and flow edit. Shortlist delivered 9/18: voice-ban violations in onboardingData.ts (15 em-dash occurrences, several "isn't X. It's Y." derivatives), one-shot save means drop-off loses everything (onboarding-diagnostics exists because of this), profile save fires only on bot choice so closing at the reveal loses the profile, offer-angle card computes from placeholder inputs before Block 2 answers exist.
5. Pricing: rule the program ladder. The old $9 / $97 / $297 checklist ladder is stale and carries no ruling. The repo canon card card-02-2 carries $147 / $297 / $497 for solo creators. The Notion IP Library services ladder (Operator $500 through EGC Intensive $52,500/mo) is a separate decision.
6. creatordarwinism.ai serves a 403: Vercel deployment protection on the swarm-haus project, not a broken build. One setting flip when Ashley wants it public.
7. The 17-item go-live checklist needs a fresh audit against today's code.

## Inbound handoff: CDOS Loop & Live Launch (filed 9/18, from the "Data Mining on phone" thread)

The four-bot flow (Archetype, Golden Offer, Pressure Test, Head Down) is being rebuilt as one continuous loop.
Rulings that hold: Pressure Test is the loop's hub and return point; Golden Offer reopens only to reshape an offer, never as a parallel door; proof of ship gates every iteration; twenty-four hours after proof the system asks for real-world data; Ash stays lifeline-only and never generates reports or tasks; swarmhaus.com stays live-only with no public capture yet; market claims are in-session research or labeled judgment.
Built and pushed on branch claude/data-mining-phone-v3vft1 (HEAD 8b29cb7): proof-of-ship intake, token-gated Golden Offer One Pager sharing, the Ash widget. Unbuilt: the loop-reopening primitive, cross-body price memory, the artifact handoff button, warmer report copy.
Full handoff: docs/handoffs/2026-09-18-cdos-loop-and-live-launch.md on that branch.
CORRECTION logged 9/18: the handoff names the live Supabase as ohgcayvyvwtybdoswpox, and that is wrong. The branch's own config.toml and client.ts still point at wjhvuumhcibzlnfbayes, verified in-session. The two new migrations run against wjhvuumhcibzlnfbayes only, through the Lovable login, never through the connector-visible project.
Decisions waiting on Ashley: the deploy path (direct apply versus PR; Sable recommends the PR lane), bot_ash board and chat IDs in Admin Settings (Ash errors on tap until set), and migration verification before anything depends on share_token or the proof columns.
Funnel receipts from the thread: first TikTok Live, "Digital Products 101," 44 minutes, 124 views, 11 comments, 2 gifters, 2 new followers, no swarmhaus takers, attributed to the 3:30 PM slot. swarmhaus.com/cdos-live.html runs outside this repo and its source location is unknown. The swarmhaus price ladder reads $49 MVP through $2,500 high-ticket, labeled inference from a marketing page.

Raw-thread supplement, filed 9/18 after Ashley pasted the full Data Mining on phone transcript. The loop doctrine in full:
Users experience one relationship that shifts modes, never four doors. The loop: Identity → Build → Verdict → Ship → Signal → Refine, looping back to Build.
Rulings the compressed handoff lost, now on the record:
- Pressure Test forks into two explicit, user-chosen modes. Gut Check: no numbers required, directional verdict, framed provisional. Signal Check: real numbers required, decisive and citable. The seed exists in code: PressureTestIntake's optional numeric fields and the backend confidence level.
- Lock In becomes a snapshot action, never a termination. Today it writes the report, marks the session complete, and routes the user away; the report should pin to the living thread instead.
- Archetype Navigator is the product's strongest moment (94 percent completion per Ashley's memo) and becomes revisitable, quarterly or whenever real numbers stop matching the self-description. call-poppy-api already injects profiles.archetype into every prompt, so updates propagate with no wiring.
- Onboarding's one job is setting the loop expectation in one sentence after Archetype completes: build your offer, get a verdict, ship it, come back with what happened, and it gets sharper each time.
Architecture map from that session: golden_offer and judge already share sessions and cd_messages through one Chat page; Archetype is a separate scripted flow writing profiles.archetype once; weekly_sessions is a dormant table with no UI and no function.
WARNING, second occurrence of the same trap: that session claimed live access to product data through the connector project ohgcayvyvwtybdoswpox and treated it as this app's database. Standing rule: the connector-visible Supabase is never the CDOS product (the product is wjhvuumhcibzlnfbayes); ohgcayvyvwtybdoswpox belongs to swarm-haus, whose own profiles tables make the confusion convincing. Any live-data claim sourced through the connector is invalid for this product.

## Next action

Ashley rules the price. Then the desk runs the rail end to end: product in Stan, Zapier pointed with the secret, one real test purchase through webhook, claim, credits, onboarding, chat.
New since 9/18: the loop branch waits on Ashley's deploy-path ruling.

## Rules

Nothing deploys without Ashley's word. Lovable auto-deploys supabase/functions on push, so any push touching those paths is a deploy.
Product repo work rides claude/payments-desk, never main.
Secrets live in the Supabase dashboard only: never in chat, never in the repo.
