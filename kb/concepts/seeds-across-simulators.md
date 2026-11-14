---
title: Seeds don't carry across simulators
lane: sv
status: learning
gaps:
  - "Assuming the same seed gives the same stimulus on VCS and Xcelium"
cards: [c-seed-1, c-seed-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  S["seed 42"] --> V["VCS RNG + its thread ordering"] --> SV["stimulus A"]
  S --> X["Xcelium RNG + its thread ordering"] --> SX["stimulus B ≠ A"]
  SV --> CMP{"compare?"}
  SX --> CMP
  CMP -->|"seed-for-seed: invalid"| BAD["false diffs"]:::bad
  CMP -->|"seed SWEEP: pass rate,<br/>coverage, bug classes"| GOOD["valid comparison"]
  classDef bad fill:#f3dde1,stroke:#b4707e
```

## Explain-back check
- Why can the same seed give different stimulus on two simulators?
- What should the migration comparison measure instead?

## Evidence
- 2026-10-06 — Q28 misconception with project impact

## Links
- [[vcs-vs-xcelium]]
