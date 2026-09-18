# Ops and infrastructure

The rails everything runs on.

## Repo map (seven, all carrying the Sable Operator Standard on main per the 9/17 brief-thread rollout)

ashley-rudder-brief: the portable brief and these project files.
chatwise-thought-hub: CDOS product, Modern Maiden, the canon mirror; main protected by an active ruleset; a 22MB bundle backup was delivered to Ashley 9/17.
swarm-haus: the creatordarwinism.ai site; the avatars feature merged as PR #27 with Supabase storage live; deploy verification was still pending when connectors flapped; the site's 403 is Vercel deployment protection, not a failure.
rep-room, oak-room, hos-website-preview, hos-wordmark-review: states unaudited from the operator session.

## Vercel (mapped 9/18 via connector)

Team: ashley-rudder's projects (hobby plan). Eleven projects.
Git-linked: swarm-haus (swarmhaus.com: First Light landing, Stripe checkout, /live mini app, PWA), oak-room, rep-room.
Unlinked (deployed by CLI or agent, no repo behind them): ashleyrudder-site (the ashleyrudder.com home, created June; the canonical-page ship path runs through locating its source or pulling its deployment bundle), cdos-egc-calculator (seven READY production deploys, July 9), cdos-golden-offer, cdos-landing, hausofsos, lab, and two auto-named projects (reverent-joliot, goofy-wing) worth a ten-minute identify-or-delete pass.
Unlinked projects are a fragility: no repo means no history and no shared brain; the standing fix is to link or vault each one's source.

## Supabase

Two projects: ohgcayvyvwtybdoswpox (HAUS OF SÔS org, the swarm-haus tables, reachable through the connector) and wjhvuumhcibzlnfbayes (the CDOS product, reachable through the Lovable login).

## Connectors

The 9/17 brief-thread record shows GitHub, Vercel, and Google flapping mid-session, and three connectors sitting unauthorized in claude.ai → Settings → Connectors.
Open loop: authorize the three, then a desk verifies the swarm-haus deploy end to end.

## Egress map and the one fix (logged 9/18)

The operator environment's network policy blocks direct reads of, at minimum: tiktok.com, hyperstudios.us, themarketingacademy.org, icloud.com, zuryhollywood.com, zuryhair.com, leadiq.com, swarm-haus.vercel.app, huggingface.co, openaipublic.azureedge.net.
Server-side connectors (WebSearch, Gmail, Drive, Vercel, VidIQ, Higgsfield) are unaffected; the wall only stops in-container fetches.
The fix, corrected 9/18 against the docs (there is no allow-all option; Custom allowlist is the ceiling):
1. Go to claude.ai/code. The environment control is NOT in settings; it is the cloud button showing "Default" in the row above the message box.
2. Open it, hover the Default environment row, click the settings gear that appears on the right.
3. In the dialog, set Network access to Custom.
4. Check "Also include default list of common package managers" so nothing that works today breaks.
5. Paste into Allowed domains, one per line: tiktok.com, *.tiktok.com, hyperstudios.us, www.hyperstudios.us, themarketingacademy.org, icloud.com, *.icloud.com, huggingface.co, *.huggingface.co, openaipublic.azureedge.net, zuryhollywood.com, zuryhair.com, swarmhaus.com, ashleyrudder.com, creatordarwinism.ai, swarm-haus.vercel.app, substack.com, *.substack.com. Save.
Changes reach sessions started after the save; running sessions keep the old wall until their containers recycle.
Standing process: when a desk hits a new walled domain it logs the domain here, and Ashley adds it on her next pass through the dialog.
Docs: https://code.claude.com/docs/en/cloud-environments
Until then: TikTok links need the full @handle/video URL, and walled articles arrive by PDF or paste into Drive.
Audio input is SOLVED as of 9/18: voice memos transcribe via the Higgsfield sandbox (faster-whisper preinstalled there; media_upload presigned PUT works from the container; S3 and CloudFront are reachable). Voice memos are an official input channel now.

## Small-threads ledger (park or finish)

Wall connector supercharger quotes. Spotify artist discovery. Venue translation. iMac operating system upgrade. Mobile audio editing tools (folds into the video system).
Data Mining on phone: closed 9/18 by handoff; it was the CDOS loop build, filed in cdos.md.
Each gets ten minutes and a verdict: finish, calendar, or close.

## Clocks running (dated commitments every desk plans around)

Marketing Academy scholarship, founder category: final interview completed 9/18, went the distance.
The Marketing Academy is a non-profit founded 2010 by Sherilyn Shackell: a free, industry-funded leadership development scholarship, 30 scholars per cohort, CEOs and CMOs as mentors, running UK, EMEA, Australia, APAC and US.
It develops leadership capability, not marketing skills, and the 9/18 final interview was with the founder herself.
Decision lands within five to seven working days of 9/18, so roughly 9/25 to 9/29.
A yes ramps immediately: cohort reveal party in Manhattan, then straight into a four-day boot camp; roughly eight residential days across a seven-month program, plus six to eight coaching hours and eight mentor sessions.
The program's own rule is all-in attendance, so a yes bends every daily desk's calendar around boot-camp weeks; the one-register discipline holds through it.

## The stack ledger (quarterly cost map, opened 9/18; correct any line and this updates)

Verified in-session 9/18:
Supabase, HAUS OF SÔS org: Pro plan, $25/mo, $75/quarter.
Vercel: Hobby, $0.
Higgsfield: Pro plan active, 413.82 credits on hand; plan price unverified, standard Pro runs $29 to $49/mo, call it $87 to $147/quarter until Ashley confirms.
VidIQ: paid credit plan active (150 renewable monthly, resets 10/14); tier price unconfirmed, $57 to $147/quarter band.
DaVinci Resolve Studio: $295 one-time this quarter, zero recurring, updates included.

Known subscriptions, price needs Ashley's one-word confirm:
Claude: the dominant line and the machine itself; Max 5x is $100/mo, Max 20x is $200/mo, so $300 or $600/quarter.
Lovable (CDOS builder): about $25/mo presumed, $75/quarter.
Perplexity Pro: $20/mo presumed, $60/quarter.
Google Workspace (hello@ashleyrudder.com): about $8/mo presumed, $25/quarter.
Microsoft 365 (OneDrive second brain): about $10/mo presumed, $30/quarter.
Second Supabase org (the CDOS product project behind the Lovable login): free or Pro, $0 to $75/quarter, only her dashboard can say.
Domains (creatordarwinism.ai about $90/yr, two .coms about $15/yr each): about $30/quarter amortized; actual hits depend on renewal dates.
Presumed free tiers pending audit: Notion, Airtable, Canva, Miro, Slack, Fireflies, Grain, ShopMy, iCloud small.

Register stack, turns on when CDOS opens:
Stan Store: $29/mo basic or $99/mo Pro, so $87 to $297/quarter; required for the Stan rail.
Zapier: free tier covers roughly 100 purchases a month, $0 now, about $20/mo at scale.
Stripe: no fixed fee, 2.9% plus 30 cents per transaction.

The quarter, honestly banded: roughly $850 to $1,300 recurring depending mostly on the Claude tier, plus $295 one-time for Resolve, plus $87 to $297 register stack once live. Call the whole machine $1,150 to $1,900 for the quarter.
The register math that matters: at the recommended $147 founding price, eight to thirteen members pay for the entire quarter including the license, and fourteen founding names are already waiting behind the 403.

## Standing state

The clock hook stamps every operator turn in chatwise-thought-hub.
BIG Brain + Phone Connection: the OneDrive second brain stays canonical for the Knowledge Base, reachable on the phone through the OneDrive app.
