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

## The mini app (located 9/18 from the July build transcript Ashley imported)

The on-camera Live tool exists and its source is the swarm-haus repo, deployed at swarm-haus.vercel.app/live (cdos-live.html; the loop handoff's "source location unknown" is now closed).
What it does: profession plus a "known for" edge in, three mining questions, then two to four expertise recontextualizations, each resolving to a digital product with name, format, buyer, price, and hook.
Hard rule baked into its prompt by Ashley's July ruling: the buyer is never inside the trade; a skill converts to its outcome and sells to the outside person who wants it, no practitioner-training ladders, no exceptions.
It runs keyed (live model call) with an offline fallback library of 107 professions; the fallback hides the "known for" line it cannot use.
Role in the money architecture: free forever, never gated. It is the show, and the driver on screen is the entry tier of the one ruled ladder.

## The money architecture (advised 9/18, awaiting the price ruling)

Every free asset is a door; all doors lead to one ladder; the ladder's first rung must be purchasable the same day.
Doors: the mini app on Lives (creator audience), the EGC ROI Calculator (CMO audience, drives strategy calls and the services ladder, never the app), the Field Guide lead magnet.
The ladder itself is conflict #3 on the index, now FOUR variants deep: the stale $9/$97/$297, the canon card $147/$297/$497, the swarmhaus live ladder, and the July advisory ladder ($29 discovery, $299-$997 expertise build, $2,500-$10,000 done-with-you, enterprise licensing).
SECOND RAIL FOUND (Vercel history, verified 9/18): swarmhaus.com is the swarm-haus repo on Vercel, and its July 16-21 production deploys carry embedded Stripe Checkout with live keys, a hosted-checkout fallback "so a sale is never lost," STRIPE_PRICE_ID in the production env, and a merge titled "working $3 revenue path," plus the First Light landing (BE YOUR OWN NETWORK) and a PWA layer.
That means two registers exist: the Stan/Zapier rail inside the CDOS app (untested end to end) and a Stripe rail on swarmhaus.com that already took a test dollar in July.
Desk task once the price is ruled: verify the Stripe rail's current state, and rule which register is THE register. The fastest path to first revenue is likely the rail that already worked.
Also verified: the EGC calculator is deployed as its own Vercel project (cdos-egc-calculator, seven READY production deploys, July 9); public URL and capture wiring still need one look.
Rung-three concept worth keeping from the July record: Expertise Extraction, a 90-minute session that turns a career into an AI-powered business asset (expertise map, frameworks, story library, content pillars, product opportunities). People buy decisions, not tools.

## Go-to-market capture (August positioning thread, filed 9/18 via closing handoff; era: knowledge date 8/13)

STATUS: UNDER REVIEW by Ashley's word, 9/18 evening: "that epiphany was a fever dream."
Nothing in this section is operative; it stands as an era-tagged record of what the August thread produced, held for the revisit.
The revisit runs against the September doctrine (one product, one register, the loop, the founding fourteen) and decides line by line what survives.
Sable's read for that revisit, held loosely: the thesis and intro lines predate the epiphany and stand on their own; the landing law from the Jack objection stands on product merits regardless of naming; the rename, the fractional-CCO service frame, the marketplace vision, the August ladder and the $500 session are the fever candidates to re-examine or kill.

Naming architecture, ruled in August: Creator Darwinism stays the philosophy and the IP; CDOS is the engine under the hood, "powered by CDOS"; The Creator's Table is the market-facing product name. Full rename waits for sales data.
The thesis line, hers and older than the product: "Get creators off your mood board and into your board room."
The intro line, verbatim: "I'm Ashley, the first Chief Creator Officer in advertising. I get creators off the mood board and into the board room."
The Creator's Table positioning: a fractional Chief Creator Officer for brands; rent the board until results prove they need the full hire.
The August ladder ($27 self-serve plus subscriptions, then the Creator's Table brand tier, then full CCO engagement) is the FIFTH price-ladder variant; conflict #3 on the index grows by one.

The $500 offer, verbatim from the handoff: "The Creator's Table Session — Your Chief Creator Officer, for one hour. Who it's for: a creator, coach, or small business owner who has an offer that isn't selling and can't see why. What happens: sixty minutes, live with you, running their business through CDOS. The Judge scores their offer to their face. You rebuild it into a Golden Offer on the spot. They leave with the one move that makes them money in the next thirty days. What they walk out with (in writing, after): their offer scored with the exact reason it wasn't converting; a rebuilt Golden Offer they can sell this week; their 30-day money move, one page. Price: $500. Seats: five this month. Close (warm leads): 'If you don't leave this hour with an offer you'd put your own money behind, you don't pay.'"
The DM, verbatim: "Hey [name], I've been watching what you're building and [one specific true thing you admire about their work]. I built something I want to put in front of you before I open it up wider. It's called The Creator's Table. One hour, you and me, and I run your offer through my system live. You walk out with your offer rebuilt and the exact move to make money in the next 30 days. I'm opening five seats this month at $500. I want you in one of them. If you don't leave with an offer you'd put your own money behind, you don't pay me a dollar. Want the first seat?" Rule: ten warm people only, voice note fine, the goal is one yes.
Filing note, corrected same evening: Sable initially flagged the $500 session as the fastest dollar in the estate; Ashley's fever-dream call withdraws that push. An offer she does not stand behind cannot be sold with conviction, and conviction is the product in a live session. The mechanic (a paid live offer-rebuild, which is the Judge and Golden Offer run in person) stays on the table for the revisit under whatever name survives.

Product vision, hers: The Creator's Table marketplace where real experts download their brains (the IP Vault is the ingest step) and users convene a blind panel of eight with a chairman synthesizing one recommendation, her titans model. The moat is real, consented, licensed expert brains; the existing category ships fictional personas and is already a commodity. Cold start curated: Ashley plus three to five consented experts and one flagship table; the marketplace opens only after it earns; rev-share so supply markets it; likeness and consent agreements drafted by a Texas attorney before anyone signs. A vetted 20-name candidate table lives in the handoff Doc, consent required before any use.
Landing law from the Jack objection: never an empty chat box. Show a sample scored verdict inside ten seconds, three named modes (Score my offer / Build my sprint / Tell me what to sell), and name the method. Five things CDOS does that a raw chatbot cannot: answers in your method not the model's opinion, delivers a verdict not a vibe, remembers the business, produces a deliverable not a conversation, ties the move to a real product.
Market proof, as-reported: Delphi raised a $16M Series A led by Sequoia (Anthology Fund participating) on 2,000+ experts and roughly 4x revenue growth since late 2024; US creator ad spend $37B in 2025, up 26 percent; fractional creative leadership up 400 percent since 2022. Analyst projections stay labeled projections and industrial digital-twin numbers never get borrowed.
Open loops from this capture: the ten warm DMs are Ashley's immediate revenue action; the public rename timing is unruled; counsel work is noted in the private record.
The private bodies (equity and certifications, and the vendor-migration record) live in the Drive handoff Doc, 1lcj4SqTdPMbb-zD6AMC9gGXnlqsyLVXrXxEmOML4ooU, and stay out of this public repo by rule.

## The beta cohort (recovered 9/18 from archive zips two and three)

Fourteen people applied to the 7-day CDOS beta between March 31 and April 9, and every one was accepted.
Sources vaulted at projects/cdos-beta-sources/ (application page, FastAPI server, admin view). The applications database itself carries names, emails, profiles, and their "wound" answers; it stays OUT of git by rule and lives in Ashley's archive and the operator scratchpad.
Gmail verifies the acceptances went out personally, one by one, April 3 through 23: "You're in. I'm building this with a small group of people who are willing to be honest about what works and what doesn't."
One tester hit a purchase screen instead of the app on April 6; Ashley corrected the door to creatordarwinism.ai/login.
April 23: Lara (hello@ladigitalmx.com, LA Digital MX, the coach from the EGC arc) got CDOS access after a kickoff call, plus a CSV of additional beta signups from the TKC launch content, which Ashley noted she "hasn't been driving to."
The fuse this lights: creatordarwinism.ai currently serves a 403 behind Vercel deployment protection. The beta cohort's own front door is walled. The 403 flip stopped being cosmetic the moment these fourteen names surfaced.
The play once the price is ruled: a founding-member letter to the cohort that owns the quiet months, reopens the door, and honors their April yes at founding terms. They are the warmest list this product has.

Founding-tester feedback recovered in full (May 11 email; name in the Gmail record, kept out of this file until this repo goes private):
What she praised: Head Down Mode's accountability without overthinking, the deployment blocks and CTA analysis structure, and the reframe of a comment as a signal instead of a minor interaction.
What she asked for, mapped to current doctrine:
1. Deeper creator discovery before strategy, with her exact intake questions: what makes your perspective different, what authority you're building, what a visitor should take away, and whether you're building community, education, consulting, products, thought leadership, or influence. This is the revisitable-Archetype ruling, specced by a user.
2. Archetype transparency: she never understood why the system chose her personality; show the profile types and the why.
3. Voice personalization: the generated hook "didn't feel like something I would say to my audience"; she softened the tone after the 48-hour window, added visuals, and it performed better, which independently validates the 24-hour real-data prompt ruling.
4. Kill the letter grades: a C after shipping discouraged her. Her replacement spec: Resonance, Momentum, Clarity, Audience Connection, Conversion Potential. This IS the loop handoff's unbuilt "warmer report copy," written by a real user in May.
She holds Creator access free for life, granted 7/19 ("You built this with me"), the template precedent for the founding-member letter.

## Next action

Ashley rules the price. Then the desk runs the rail end to end: product in Stan, Zapier pointed with the secret, one real test purchase through webhook, claim, credits, onboarding, chat.
New since 9/18: the loop branch waits on Ashley's deploy-path ruling, and the mini app needs a currency pass (deploy verified, key funded, strict rule spot-checked, on-screen price updated) before her next Live.

## Rules

Nothing deploys without Ashley's word. Lovable auto-deploys supabase/functions on push, so any push touching those paths is a deploy.
Product repo work rides claude/payments-desk, never main.
Secrets live in the Supabase dashboard only: never in chat, never in the repo.
