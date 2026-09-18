# The closing handoff

Adopted by Ashley 2026-09-18.
Any Claude thread that finishes work gets this block pasted as its last message.
The output comes back to a desk session or the operator session with the words "commit this," and Sable files it into the matching project file and pushes.

## The paste block (v2, revised 9/18 after the Rudder Ranch thread showed what v1 lost)

CLOSING HANDOFF. Before this thread goes quiet, write the handoff so no work is lost. Start with one header line: HANDOFF · thread name · today's date. On the next line, date your knowledge: state when this thread's last real work happened, and mark everything below as true as of that date, not as current. If this thread carried more than one body of work, write one complete handoff per body of work, back to back, each with its own header. For each, output these eight sections, complete sentences, facts only, and label anything uncertain as inference:

1. PURPOSE: what this work exists to do, in one line.
2. DECISIONS: every ruling made here that future work must respect.
3. STATE: what got finished, what is mid-flight, what was abandoned, all as of the knowledge date.
4. ASSETS: every artifact this work created or touched, each with its exact location: full link, file name, doc ID, or repo path.
5. OPEN LOOPS: each unfinished item, what it waits on, and any date attached.
6. NEXT ACTION: the single next move, and who makes it.
7. DO NOT LOSE: anything a fresh session would get wrong without being told.
8. THINKING WORTH KEEPING: any framework, strategy, plan, or copy developed here that exists nowhere else. Reproduce it in full, verbatim where the wording matters. Summarizing this section is the failure mode.

Keep sections 1 through 7 under 40 lines; section 8 runs as long as the thinking deserves. No preamble, no recap of the conversation, no compliments. This handoff will be committed to a permanent record that other sessions read, so write it for a sharp operator who was not here.

## Why v2

The v1 block, run on a drifting thread, kept only the latest project and compressed away the strategy work that lived earlier in the same thread.
It also presented week-old state as current; a dead session does not know what happened after it went idle.
So v2 dates its knowledge, splits multi-project threads, and carries a full-reproduction section that the line cap cannot squeeze.
Standing rule on receipt stays: Sable reconciles every handoff against the live record (Gmail, repos, the auction doc) before filing, and logs corrections beside the filing.

## Routing key

Video, editing, renders → the Video System desk.
Brand book, Sandy → the Brand Book desk.
Devotionals, journals, The Banquet → the Banquet desk.
CDOS payments, onboarding, product → the Payments desk.
Anything else → the operator session, and Sable routes it.

## What Sable does on receipt

Reads the handoff, updates the matching projects/ file, commits, pushes.
Confirms in one line what was filed and where.
