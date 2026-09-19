# CDOS experience audit — 2026-09-18

Source: a full read of the live code in chatwise-thought-hub, commissioned by Ashley so the product can be fixed and marketed from evidence instead of guesses.
Every finding carries a file and line so the Payments desk can act without re-deriving anything.
Era note: read against the repo as of 9/18. Confirm each line still matches before changing it.

## THE KILLER: why a report has never been generated

Chat.tsx:931-938 shows a banner when the message cap is hit: "You've reached the message limit for this session. Click the button below to get your report."
Chat.tsx:986-1005 wraps ChatInput in `{!messageLimitReached && (...)}`.
The only "Lock In My Golden Offer" control in the entire app lives inside ChatInput (ChatInput.tsx:254-267).
So the moment the cap is reached, the button is unmounted from the page, and the banner points at a control that no longer exists. There is no header button, no sidebar button, no keyboard path.
Both tier_single and tier_monthly seed messages_per_session at 50 (migration 20260221213217, lines 155-156), so any thorough interview reaches this state.
A user who hits the cap cannot generate a report from that session by any means. This is the single highest-value fix in the product.

SCOPE CORRECTION, 9/18, after Ashley produced a real report: this bug does NOT make reports impossible. It makes them impossible for anyone who talks past the message cap. A user who locks in before the cap gets the button and the full artifact, and the artifact is excellent. The earlier framing of this file, that the bug "explains zero reports," overstated the claim; the honest version is that the admin dashboard read zero for the charted month while a working report path exists.
That raises a separate question the desk must answer: whether report_generated events are actually counted by the dashboard metric. If reports exist and the dashboard reads zero, the analytics are lying to Ashley about her own product and every read off that panel is suspect.

Compounding it:
1. Label mismatch. The Golden Offer prompt tells users to "run the report" (call-poppy-api/index.ts:493). The on-screen label is "Lock In My Golden Offer" in 11px, third in a row after Attach and Talk. The Judge prompt, by contrast, names its button explicitly: "Name the button: Get My Verdict" (index.ts:546).
2. No in-transcript call to action for Golden Offer. ChatMessage.tsx:138-159 renders a bordered CTA box, but only for assistant messages matching the STANDING VERDICT pattern, which only the Judge produces (index.ts:538). The Judge gets a button inside the conversation; the Golden Offer gets nothing.
3. The confirm dialog is written for deferral. Chat.tsx:81-88 opens with "Your session will close," which reads to a single-session buyer as spending their purchase, and the decline button is labeled "Not Yet," the frictionless postpone.
4. Contradictory instructions. The toast says "End the session to get your report" (Chat.tsx:462) while the banner says "Click the button below" (Chat.tsx:935).

## Other cliffs, ranked by damage

1. ONBOARDING HAS NO PERSISTENCE. All ten answers live in React state and refs; saveOnboardingData() runs in exactly one place, handleBotSelect (OnboardingChat.tsx:769), at the very end. A refresh, tab close, phone lock or back-navigation at minute nine of a ten-minute interview loses everything and returns the user to "Hey. I'm the Archetype Navigator." No resume, no draft, no guard.
2. PAYING USERS LAND AS FREE. OnboardingChat.tsx:511-519 inserts user_credits with tier 'free' and sessions_limit 1 AFTER VerifyPurchase.tsx:149-159 tried to update a row that did not exist yet. A paying monthly subscriber finishes onboarding on the free tier. This is the credits wall seen in the admin data, and it has a cause.
3. A DEAD END IN THE FIRST CHOICE. IntentRouter's "pressure-test an existing offer" routes to /dashboard?start=judge, a parameter read only by BotCardGrid.tsx:185, which is imported by nothing. The user lands on the dashboard, nothing happens, and an orphaned active golden_offer session is left behind.
4. SESSION LIMITS ARE NOT ENFORCED ON THE LIVE PATH. The only check lives in that same orphaned BotCardGrid; Dashboard.tsx:111-141 creates sessions with no credit check.
5. THE BOT IS NOT REQUIRED TO NAME AN OFFER UNTIL THE FOURTH REPLY (index.ts:571). The code's own comment records that this already failed in production: "four replies, three of them gates, no offer."
6. NO GREETING AT THE START OF THE PAID PRODUCT. The first screen after onboarding is a three-option form (IntentRouter), and the first transcript line is written in the USER's voice, not the bot's. There is no scripted opener anywhere in the Golden Offer path.
7. UNPARSEABLE REPORT BURNS THE SESSION. Chat.tsx:695-706 saves the row, flips the session complete, and shows one toast. No retry, no regenerate, no refund.
8. THE REVEAL HAS NO EXIT. ProfileRevealSequence offers Back at every stage and no skip or close; the profile is only written to the database when a bot is chosen, so closing the tab discards the whole session.
9. EVERY SESSION IN THE SIDEBAR IS NAMED THE SAME THING. Title is set to "{firstName}'s Profile" at creation (OnboardingChat.tsx:783), so the rename at Chat.tsx:496 never fires.
10. TWO PRICE LADDERS ARE LIVE RIGHT NOW. public/goldenoffer/index.html sells $27 / $197 / $497 while the seeded app settings carry $9 / $97 / $297. Conflict #3 on the index is not theoretical; both are in production.

## The strengths, which are the marketing assets

THE ARCHETYPE REVEAL is the strongest three seconds in the product. ProfileRevealSequence.tsx: a breathing gold card on black, tap to reveal, a 3D flip on a spring, then the archetype name typing itself letter by letter at 35ms per character with a sound cue.
The five archetype lines (onboardingData.ts:620-626) are the sharpest copy Ashley has written in this product:
Plateaued: "You've earned your seat. Now you need a second act."
Pigeonholed: "The original thing works. That's also the trap."
Invisible: "Deep skills. Weak packaging. The gap is closeable."
Multi-Hyphenate: "Many skills and ideas. No unifying throughline. Yet."
Aspiring: "Ready to move from content labor to business ownership."

THE ONE STRUCTURAL FIX WORTH MORE THAN ITS COST: the modifier tease withholds the name ("I have a name for this," "That gap has a name") but it plays AFTER the name has already been spelled out letter by letter. Reversing stages 1 and 2 recovers the entire dramatic payload for free.

Other filmable moments, with their locations:
The three wounds full-bleed, 6xl mono caps with gold glow (Login.tsx:145-162).
The deliberation screen, counter-rotating rings and the scoring lines ticking, closing on "About half a minute. Stay here, it lands on its own" (VerdictDeliberation.tsx).
Head Down's failure state: "Three sprints missed. Scale the target down and ship smaller," with a button reading "Ship smaller" (HeadDownPanel.tsx:75, 89). Nobody else in the category ships that.
The report handoff: "Ideas create possibilities. Systems create businesses." (GoldenOfferReportCard.tsx:36-37).
The funnel's best line: "You are great at your work. People with less skill charge more than you. The reason is simple: your best asset is invisible to you." (public/goldenoffer/index.html).

## The voice seam, and it sits exactly where users leave

Login, the funnel, VerdictDeliberation, HeadDownPanel and the modifier teases are written in the house voice.
VerifyPurchase, AuthForm, UpgradePrompt, MorningInsights and every toast are written in default product-template voice.
The seam is visible at the precise moment a user crosses from marketing into the product, which is also where the drop begins.

Voice-law violations in hardcoded copy, roughly forty in onboardingData.ts alone: em-dashes at lines 4, 8, 12, 14, 16, 20, 290, 322, 325, 341, 368, 461, plus OnboardingChat.tsx:623 and ChatContextPanel.tsx:215, 226. "It's not X. It's Y." derivatives at onboardingData.ts lines 6, 8, 10, 12, 16, 20, 22, 29, 35, 47, 55, 59, 61, 65, 67, 75, 77, 83, 97, 105, 107, 109, 115, 125, 141, 145, 155, 163, 169, 175, 179, 185, 471.
The irony to fix first: call-poppy-api/index.ts:744 strips em-dashes out of model output and utils.ts:70 strips the banned construction out of model output, while the hardcoded copy sitting beside them breaks both rules forty times over.
Exclamation points in on-screen copy and toasts across VerifyPurchase.tsx:186, Profile.tsx:471, Chat.tsx:837 and 877, Dashboard.tsx:71, GoldenOffersCard.tsx:86, VerdictsCard.tsx:116, TaskTracker.tsx:257, ChatMessage.tsx:100 and 113, GoldenOfferReportCard.tsx:46, NotFound.tsx:15.

## Fix order, Sable's recommendation

1. Restore a report control that survives the message cap. Nothing else moves the zero.
2. Name the button in the Golden Offer prompt the way the Judge already does, and give the Golden Offer an in-transcript CTA.
3. Rewrite the Lock In dialog so it leads with what the user gets rather than what closes.
4. Fix the tier overwrite so paying users stop landing on free.
5. Autosave onboarding after each block.
6. Reverse the two reveal stages.
7. Sweep the voice violations in hardcoded copy.
Everything above is a small change. None of it is a rebuild.
