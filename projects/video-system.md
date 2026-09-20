# Video system

The edit-and-grade machine behind every content property.
Home: chatwise-thought-hub → docs/content/video-grade-recipes.md (the law; every video session reads it first), the Cut Room board for live edit state, Higgsfield and VidIQ for the tools.

## Where it stands

The grade recipes are committed and current.
The Cut Room board holds shot plans, burn copy, asset casting, and delivery status: https://claude.ai/artifact/GCPJSjEorVMAZKv1kv5e5s
The Real Cut render is HELD awaiting Ashley's explicit "run it"; the old Higgsfield upload slot is presumed expired and gets re-reserved at resume.
VidIQ verified 9/18: 189 credits, 149 renewable of 150 plus 40 add-on, renewable resets 10/14. Treat them as scarce.
Higgsfield verified 9/18: 413.82 credits on the Pro plan. The recipes doc says Plus; the plan moved up since 9/17.
Brand-page receipts, 9/17: gel video at 45.6K views, install film at 7,159 views and 16 percent, on a 325-follower page.

## Open loops

1. The refocus ruling from Ashley: what the system serves next (Modern Maiden volume, Banquet faceless content, CDOS program media, or all three on a schedule).
2. Real Cut: waits on "run it."
3. Mobile audio editing tools thread: fold its findings into the recipes doc or close it.
4. Higgsfield credit and slot audit before the next render.

## The inspiration spec (decoded 9/18 from Ashley's voice-memo capture of the TikTok)

The pipeline in the video: an AI assistant connected to the DaVinci Resolve MCP, given the footage location plus four reference videos to learn the creator's style frame by frame.
One chat brief runs the whole edit: cut the pauses, fix and normalize audio, light music bed, captions in his font matched to voice cadence, color correct against the references, b-roll images placed to match captions, images fetched by the agent's own browser access.
Verified 9/18: DaVinci Resolve 21.1 shipped September 8, 2026 with a NATIVE MCP server (Studio edition), File > Setup AI Assistants, 88 tools across edit, color, Fairlight, media pool and render queue, and the named supported assistants include Claude and Claude Code.
MAC LANE IS LIVE as of 9/18 evening: Ashley confirmed Resolve Studio 21.1 installed with File > Setup AI Assistants present, and she completed the assistant connection. The hardware gate is therefore satisfied (Sequoia plus Apple Silicon).

THE DIVISION OF LABOR, and it is a hard architectural fact: the Resolve MCP server runs locally on Ashley's Mac and is reachable only by a Claude session running on that same Mac. No cloud desk can drive Resolve, ever. So the Cut Desk in the cloud does planning, shot plans, asset prep, grade recipes, burn copy and board state; the LOCAL Mac session executes the edit inside Resolve. Any charter instruction that implies a cloud session touching Resolve is wrong by construction.
The local session's style law on open: docs/content/video-grade-recipes.md in chatwise-thought-hub, plus four of Ashley's own finished cuts as frame-by-frame references, which is exactly the method the inspiration video describes.

Two lanes to the same smoothness:
1. Mac lane, the literal demo: Resolve Studio 21.1 on Ashley's Mac, Setup AI Assistants, a local Claude Code desk driving it, video-grade-recipes.md plus four reference cuts as the style law.
Mac lane hardware gate, verified 9/18 evening and it supersedes the earlier order: Resolve 21.1 on Mac requires macOS 15 Sequoia AND Apple Silicon; Intel Macs are outside the 21.1 baseline entirely.
The iMac in the ops ledger is an OCLP machine, meaning Intel, so it cannot run Resolve 21.1 even after the 3-hour OS jump; the OCLP upgrade buys that machine nothing for this lane.
The gate check is Apple menu, About This Mac: a chip line reading Apple M-anything is a green light; a line reading Intel kills the local lane on that machine.
Green light order: buy Studio $295 one-time from a key-emailing reseller (B&H, ProCam; Blackmagic direct ships a physical card; avoid the Mac App Store build until its MCP support is confirmed; the free edition has no MCP server), install, activate, File then Setup AI Assistants, then the local Claude Code desk with the recipes doc and four reference cuts.
Intel-only outcome: no license purchase; the cloud lane below is the edit machine, and the local lane waits for Apple Silicon hardware.
2. Cloud lane, proven tonight: the Higgsfield sandbox carries ffmpeg, sox, faster-whisper and caption fonts, enough for a brief-in cut-out pipeline (pause-cut from word timestamps, loudness normalize, styled captions, music bed, LUT) without her Mac in the loop.
Both lanes obey the babysitting rule below.

## The render babysitting rule (set 9/18 after the Cut Desk permission loop)

Ashley is never the approve button.
A desk waiting on a render waits with mcp__Higgsfield__jobs_wait, or with the longest single wait the tool allows, never with a sleep-and-poll loop through sandbox_exec.
If a tool must run repeatedly, the desk asks Ashley once for always-allow on that tool, then runs quietly.
Waiting is visible, never silent: the desk posts a status line to the Cut Room board at render start, at meaningful progress, and on delivery.
For scale: an edit turn is minutes, a render is tens of minutes, and a desk that needs a human tap every minute is misbuilt and gets rebuilt.

## Miss Moth 2026 (opened 9/20 on the Cut Desk)

The build spec is docs/content/miss-moth-2026-timeline.md on branch claude/bill-cds-mobile-viewing-qb6o05 of chatwise-thought-hub.
The Resolve build sheet is docs/content/miss-moth-build-sheet.md on branch claude/video-desk, redlined and pushed 9/20.
Ashley's redlines, 9/20, they govern: 45 seconds not 40; no makeup application footage anywhere, IMG_4391 and IMG_4392 out entirely; cards are the board stills plus Coco final-look video only; captions in her big yellow Didone style, one word at a time, Bodoni Moda matched by eye against Editing example 2.
The model is named Coco. The wings file IMG_0022 is Coco in the final look.
All sources verified in Drive folder Miss Moth 2021 except Ashley Talking Head.mov and the two Editing example files, which sit only in ~/Downloads/Miss Moth 2021 on the mini.
The feather extension edit from 9/18 stands by: source measured (12:44, 4K60 portrait, silent, luma 124.7 sat 10.2, contact sheet in Higgsfield media 44659c5a), waiting behind Miss Moth.

## Next action

The mini's local desk opens Resolve, reads the build sheet, stages the plan on the Cut Room board, and holds for Ashley's run order.
The cloud Cut Desk holds planning, board state, and Drive-side asset prep, per the division of labor above.
