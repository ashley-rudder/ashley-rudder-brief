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
Two lanes to the same smoothness:
1. Mac lane, the literal demo: Resolve Studio 21.1 on Ashley's Mac, Setup AI Assistants, a local Claude Code desk driving it, video-grade-recipes.md plus four reference cuts as the style law. Studio license is the prerequisite to confirm.
2. Cloud lane, proven tonight: the Higgsfield sandbox carries ffmpeg, sox, faster-whisper and caption fonts, enough for a brief-in cut-out pipeline (pause-cut from word timestamps, loudness normalize, styled captions, music bed, LUT) without her Mac in the loop.
Both lanes obey the babysitting rule below.

## The render babysitting rule (set 9/18 after the Cut Desk permission loop)

Ashley is never the approve button.
A desk waiting on a render waits with mcp__Higgsfield__jobs_wait, or with the longest single wait the tool allows, never with a sleep-and-poll loop through sandbox_exec.
If a tool must run repeatedly, the desk asks Ashley once for always-allow on that tool, then runs quietly.
Waiting is visible, never silent: the desk posts a status line to the Cut Room board at render start, at meaningful progress, and on delivery.
For scale: an edit turn is minutes, a render is tens of minutes, and a desk that needs a human tap every minute is misbuilt and gets rebuilt.

## Next action

Desk opened 9/18. State-of-play and the three highest-leverage moves posted in chat. Waiting on Ashley's refocus ruling.
