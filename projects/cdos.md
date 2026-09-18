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

## Next action

Ashley rules the price. Then the desk runs the rail end to end: product in Stan, Zapier pointed with the secret, one real test purchase through webhook, claim, credits, onboarding, chat.

## Rules

Nothing deploys without Ashley's word. Lovable auto-deploys supabase/functions on push, so any push touching those paths is a deploy.
Product repo work rides claude/payments-desk, never main.
Secrets live in the Supabase dashboard only: never in chat, never in the repo.
