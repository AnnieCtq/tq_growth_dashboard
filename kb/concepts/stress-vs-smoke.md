---
title: Smoke, sanity, nightly, stress regressions
lane: tools
status: learning
gaps:
  - "Stress regression confused with smoke/sanity regression"
cards: [c-reg-1, c-reg-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
quadrantChart
  title Regression types
  x-axis Few seeds --> Many seeds
  y-axis Short runs --> Long runs
  quadrant-1 Stress
  quadrant-2 Long directed
  quadrant-3 Smoke / sanity
  quadrant-4 Nightly random
  Smoke: [0.15, 0.15]
  Nightly: [0.65, 0.4]
  Stress: [0.85, 0.85]
```

## Explain-back check
- What is a smoke regression for, and what is a stress regression for?
- Why is the smallest test the first one you bring up?

## Evidence
- 2026-10-06 — Q16 incorrect, Q19 half

## Links
- [[regression-flow]]
