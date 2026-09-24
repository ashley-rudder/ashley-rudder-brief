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

## The card layer law (corrected 9/20 on the mini, it supersedes the recipes doc)

Ashley's ruling, watching her own reference: it is fine to cover her, she does not have to be seen every second.
Measured off Editing example 2, frame by frame, and this is the geometry that ships:
Cards run about 92 percent of frame width, centred, sitting in a fixed vertical band.
They cover her face completely. She reads as a strip of hair above and a strip of top below. Several go full bleed.
No white border. The card is a bare photograph, not a print laid on the picture.
Captions hold one fixed position and ride ON TOP of the card. They never move out of its way.

The line in video-grade-recipes.md that says "none of the reference reels ever fully cover the speaker", and the 45 to 60 percent width figure beside it, are WRONG. They are struck.
That doc had already corrected itself once in the wrong direction. Do not let it correct back.

Cut rhythm, measured off the same reference: clean for 2.08 seconds, then events every 0.63 to 1.13 seconds out to 10.58, then holds of 1.5 to 3.5 seconds.
Coverage past 20 percent is fine. The reference runs higher.

The useful consequence: if cards cover the speaker, a tight crop stops mattering for the card layer.

## Reference use (Ashley's ruling, 9/20, standing)

All references are used as REPORTAGE.
Identifiable women are OUT of the exclusion list. That entry is deleted, not narrowed.
No session limits reference use again. Do not re-raise it, do not re-impose it, do not quietly drop a card on those grounds.
What still gets cropped is app chrome, because chrome is sloppy, not because the image is restricted.

## Miss Moth 2026 (rebuilt 9/19 to 9/20 on the mini, in Resolve)

The old Resolve project "Miss Moth 2026" is DELETED on Ashley's word. Both its timelines were in breach.
MISS MOTH 45 ran IMG_4391 and IMG_4392, the redlined makeup footage, as its spine.
MISS MOTH TALK 45 ran a silent Coco spine under thirteen board cards, which was the 2021 post with its moodboard moved into corner cards. No new argument. Ashley binned it.

MISS_MOTH_2026_v1 is the live project. 1080x1920 at 30. Pool is her take and the wings, nothing else.

THE SCRIPT CHANGED and the new one governs. Ashley delivered it to camera in one take, every line, in order.
It runs 149 words and 61.0 seconds of speech with the pauses already cut.
The 45-second redline was set against the old 95-word script and no longer fits. Runtime is an open call.
Three rules carry the piece: steal from an archive not a costume aisle, do the damage yourself, then build the face.
The close is "nobody at the party will know what she is, two people will ask, those are the two you came for."

The spine is ASHLEY, confirmed 9/19. Ashley Talking Head.mov is 3840x2160 LANDSCAPE, shot tight, 71.5s, measured luma 130.8 saturation 8.4.
It fails the loose-frame spec and no reframe fixes it. Fill crop leaves no room. A blur plate fills the card zone with her own blurred jaw. Both were built and both were rejected on sight.
A vertical reshoot is still wanted for the room and the seated frame. It is no longer blocking, because the cards cover her.
Ashley's position 9/20: this is a scratch draft to judge everything else, she refilms if she likes the rest.

Scratch delivered: MISS_MOTH_2026_v1_SCRATCH.mp4 in ~/Downloads/Miss Moth 2021, 69.3 seconds, 18 cards, 30 percent coverage.
Structure: her placard line rides over the wings, then six on-camera cuts with pauses out, then the wings close.
Grade landed: spine 117 luma 14.5 saturation against 115 and 16 targets. Wings carry their own gamma so they do not run hot.
Cards are the board stills, cropped of chrome.

## The pipeline, now built and reusable

Resolve project and timeline setup, 1080x1920 at 30.
Transcription: MediaPoolItem.TranscribeAudio gives word-level timecodes. Timeline.CreateSubtitlesFromAudio with charsPerLine 1 gives one caption per word.
Subtitle TEXT IS READ-ONLY through the API. SetName returns False. Mis-hears get fixed in the burn layer, not in Resolve.
THE MINI'S FFMPEG HAS NO LIBASS AND NO DRAWTEXT. Burned subtitles and drawtext both fail.
Captions and cards render instead as a per-frame RGBA PNG layer from Pillow in a venv, then composite in one overlay pass. 2078 frames in about 20 seconds.
Grade runs after the Resolve picture render, tuned by measuring with signalstats and iterating to the target numbers.
Bodoni 72 Bold is at /System/Library/Fonts/Supplemental/Bodoni 72.ttc, face index 2. Bodoni Moda is not installed. Didot is.

With footage shot to spec, a piece like this is about fifteen minutes of desk time and most of that is the render.

## Open calls on Miss Moth

1. Runtime. 61 seconds of speech against a 45-second redline that predates the script.
2. Caption style. Ashley's redline says big yellow Didone. Editing example 2 actually shows SMALL WHITE LOWERCASE SANS set low. The build sheet claims the reference shows yellow Didone and it does not. Built to her redline pending her call.
3. The card pool. Pinterest board cannot ship. Replacement sourcing is under way.

## Archival sourcing for Miss Moth (9/20 to 9/23)

Ashley wants the three rules carried by real archival material, and supplied three references herself, all 474px search thumbnails.
Chased to source and held in the session scratch under archival/:
The wedding dress packed in an archival box is an EXACT match at 1500x799. It is the Gaylord Archival preservation box product shot.
The gold moth was not matched. A sharper flat-lay specimen at 2940x1960 stands in. Angle differs, Ashley's call.
The textile moth is MISTER FINCH, Leeds, who builds moths from vintage velvet curtains, old aprons and wedding dresses.
Her exact piece is unreachable. Pinterest blocks hotlinking and mister-finch.com is a dead domain.
What was found is better: two Finch moths on a stack of antique books, 800x1203 from Colossal, one spine reading The Art of Needle Craft. The archive and the thing that eats it in one frame.
Also held: a 3072x3072 clothes moth with larvae and frass on the fabric it fed on, plus V&A costume-audit frames at 610px. LACMA's conservation shots are served at 400px and are too small to use.
Still missing and worth shooting rather than sourcing: hands folding a dress into tissue. Rule two is do the damage yourself.

## Next action

Place the three archival finds on their beats, taking the cut to 21 cards, and re-encode.
Then Ashley's calls on runtime, caption style, and whether the reshoot happens.
The Cut Room board is one publish behind and carries the pre-cards state.
