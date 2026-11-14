---
title: Regression stopped running
lane: debug
status: learning
gaps:
  - "Regression-not-running triage order"
cards: [d-reg-1]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  A["not run > 1 week"] --> B["1. recent error logs<br/>(build-flow failure?)"] --> C["2. schedule (cron)"] --> D["3. still needed?"]
```

## Explain-back check
- Why check the error logs before the schedule?

## Evidence
- 2026-10-06 — Q6 confirmed

## Links
- [[regression-flow]]
