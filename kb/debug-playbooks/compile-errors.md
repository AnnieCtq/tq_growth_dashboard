---
title: Compile / elaboration errors
lane: debug
status: learning
gaps:
  - "Compile stages"
  - "Config hierarchy tracing for macro errors"
cards: [d-cmp-1]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TD
  E["build error"] --> G["find failing .log(.gz)"] --> S{"which stage?"}
  S -->|preprocess| M["macro: trace config hierarchy<br/>→ which config defines it"]
  S -->|parse| D["undeclared id: missing include/<br/>package import/file in filelist"]
  S -->|elaborate| P["missing port/module:<br/>filelist order, wrong RTL rev, bind target"]
  M & D & P --> N["add to personal debug notes"]
```

## Explain-back check
- Walk through the unidentified-macro debug you're proud of, naming the stage.
- Method for 'missing file': how do you find the filelist that should include it?

## Evidence
- 2026-10-06 — Q22 confirmed (own debug from notes)

## Links
- [[compile-stages]]
