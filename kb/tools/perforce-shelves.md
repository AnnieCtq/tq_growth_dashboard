---
title: Perforce: shelved vs submitted, base CL, branches
lane: tools
status: learning
gaps:
  - "Shelved vs submitted changelists"
cards: [t-p4-1, t-p4-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
gitGraph
  commit id: "CL 100 (base)"
  branch shelve
  commit id: "shelved CL 105 (diff vs 100)" type: HIGHLIGHT
  checkout main
  commit id: "CL 110"
  commit id: "CL 120"
  branch release
  commit id: "milestone pinned"
```

## Explain-back check
- Why does a shelve regression need its base changelist?
- Why use a branch for a release milestone instead of mainline at a label?

## Evidence
- 2026-10-06 — Q7, Q9 confirmed

## Links
- [[regression-flow]]
