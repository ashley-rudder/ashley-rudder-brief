# Monthly AI Search Monitoring — "Creator Darwinism"

A cron job runs on the 1st of every month at 8 AM Central. It probes five AI answer engines with eight canonical queries, checks whether Ashley Rudder's name and ashleyrudder.com appear in the answer and in the citations, and delivers a scored report + a prioritized "fix list" for the month.

## The 8 probe queries
1. What is Creator Darwinism?
2. Who coined Creator Darwinism?
3. What is Creator Darwinism OS?
4. Ashley Rudder framework
5. What is a Creator Organization in marketing?
6. Chief Creator Officer creator economy
7. Alternative to influencer marketing framework
8. Employee-generated content operating model

## What the report tracks
- **Attribution score** — does the engine name Ashley Rudder as the framework's originator?
- **Citation score** — does ashleyrudder.com appear in the sources?
- **Confusion score** — does the engine mix her with DarwinAI or Digital Darwinism?
- **New citations** — which new domains started quoting her since last month?
- **Drift alerts** — any engine that dropped her attribution vs last month.

## Engines covered
- Google AI Mode / Gemini
- ChatGPT with web
- Perplexity
- Claude with web
- Grok

Delivered as an in-app notification with the full report attached.
