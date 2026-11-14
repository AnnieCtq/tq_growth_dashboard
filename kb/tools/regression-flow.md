---
title: Nightly regression: trigger to signature mail
lane: auto
status: learning
gaps:
  - "Explaining why the regression flow behaves as it does, not only what it does"
cards: [t-reg-1, t-reg-2, t-reg-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  C["cron trigger"] --> L{"limit free?"}
  L -->|no| W["pend"]
  L -->|yes| SY["sync workspace / CL"] --> BF["build flow"] --> LSF["LSF submit"] --> SIM["simulate N tests"] --> PR["parse logs"] --> COV["merge coverage"] --> MAIL["signature mail"] --> REL["release limit"]
  SIM -.->|"process crash"| X["limit never released?"]:::bad
  C -.->|"previous run still active"| OV["overlap: kill or pend?"]:::bad
  classDef bad fill:#f3dde1,stroke:#b4707e
```

## Explain-back check
- Walk the stages from cron trigger to signature mail, with the log location at each stage.
- If the wrapper crashes after LSF submit, what releases the limit? Prove it from the script.
- Why is vcs_run.log deleted, and what's the trade-off?

## Evidence
- 2026-10-06 — Q1–Q6; triage order confirmed; failure paths recurring

## Links
- [[stress-vs-smoke]]
- [[perforce-shelves]]
