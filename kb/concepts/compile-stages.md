---
title: Compile stages: preprocess, parse, elaborate
lane: sv
status: learning
gaps:
  - "Compile stages: preprocessing (macros) vs parse (undeclared identifiers) vs elaboration (missing ports or hierarchy)"
cards: [c-cmp-1, c-cmp-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  P["Preprocess<br/>`define, `include, `ifdef"] --> PA["Parse / compile<br/>syntax, declarations, types"] --> EL["Elaborate<br/>hierarchy, ports, parameters, bind"] --> SIM["Simulate"]
  P -.-> e1["unidentified macro"]:::err
  PA -.-> e2["identifier not declared"]:::err
  EL -.-> e3["missing port / unresolved module"]:::err
  classDef err fill:#f3dde1,stroke:#b4707e
```

## Explain-back check
- Put each error in its stage: unidentified macro, undeclared identifier, missing input port.
- Method (not instance): how do you find which filelist/include should pull in a missing file?

## Evidence
- 2026-10-06 — Q17/Q18: good triage, stages not distinguished

## Links
- [[compile-errors]]
