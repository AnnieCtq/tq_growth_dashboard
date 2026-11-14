---
title: VCS → Xcelium migration
lane: tools
status: learning
gaps:
  - "Assuming the same seed gives the same stimulus on VCS and Xcelium"
cards: [t-mig-1]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TD
  A["inventory: compile/elab/run switches"] --> B["map switches VCS → Xcelium"]
  B --> C["port regression scripts + env"]
  C --> D["run both in parallel"]
  D --> E["compare by seed sweep:<br/>pass rate, coverage, runtime"]
  E --> F["coverage DB plan"]
```

## Explain-back check
- Name two concrete flow-breaking differences (switches or formats).
- Write the comparison criteria in one sentence without seed equivalence.

## Evidence
- 2026-10-06 — Q27 partial, Q28 misconception

## Links
- [[seeds-across-simulators]]
- [[coverage-merge]]
