---
title: Covergroup scores: group vs instance, union vs average
lane: sv
status: learning
gaps:
  - "Group vs instance score, union vs average modes"
  - "Sign-off meaning of the group score: what union mode hides vs what average mode hides"
cards: [c-cov-1, c-cov-2, c-cov-3]
interactive: "interactive/coverage-calculator.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TB
  I0["instance 0<br/>bins A B C D<br/>hit: A B → 50%"] --> U
  I1["instance 1<br/>hit: B C → 50%"] --> U
  I0 --> AV
  I1 --> AV
  U["UNION (merge_instances=1)<br/>A B C hit → 75%"]
  AV["AVERAGE (per_instance, merge_instances=0)<br/>(50+50)/2 → 50%"]
  U -.->|hides| H1["an instance with holes"]:::bad
  AV -.->|hides| H2["which instance lags"]:::bad
  classDef bad fill:#f3dde1,stroke:#b4707e
```

▶ **Interactive:** [coverage calculator](../interactive/coverage-calculator.html)

## Explain-back check
- Compute union and average for 4 bins, 2 instances: inst0 hits A,B; inst1 hits B,C.
- At sign-off, what can a 100% union-mode group score hide?
- Which mode does your team's flow use, and how did you check?

## Evidence
- 2026-10-06 — Q11 not confirmed (roles reversed)
- 2026-10-28 — calculated 75% / 50% with one hint; flow mode = average (Verdi)

## Links
- [[code-vs-functional-coverage]]
