---
title: DUT bug or testbench bug?
lane: debug
status: learning
gaps:
  - "DUT vs testbench verdict"
  - "Root cause vs trigger in debug write-ups"
  - "Scoreboard failure triage"
cards: [d-verdict-1, d-verdict-2, d-verdict-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TD
  F["failure"] --> R["reproduce with the same seed"]
  R --> EA["expected vs actual,<br/>expected taken from the SPEC"]
  EA --> Q{"is the DUT output<br/>wrong per spec?"}
  Q -->|yes| DUT["DUT bug → file to design"]
  Q -->|no| TB{"is the checker/model/<br/>stimulus wrong?"}
  TB -->|yes| TBB["TB bug → fix in TB"]
  TB -->|unclear| WAVE["waveform at failure time,<br/>ask spec owner"]
  DUT & TBB --> WR["write-up: trigger / root cause /<br/>DUT or TB / where the fix went"]
```

## Explain-back check
- Define trigger and root cause, using the multi-instance checker as the example.
- The fix went into the checker binding. Was it a DUT bug or a TB bug?
- Your first 15 minutes on a scoreboard UVM_ERROR, in order.

## Evidence
- 2026-10-28 — verdict misjudged (DUT, but fix in checker)

## Links
- [[config-db-and-bind]]
- [[fifo-scoreboard-rd-valid]]
