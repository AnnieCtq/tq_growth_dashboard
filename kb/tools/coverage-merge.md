---
title: Coverage merging across RTL changes and simulators
lane: tools
status: learning
gaps:
  - "Merge semantics when runs were compiled from different RTL (what flex_merge resolves)"
  - "Coverage database merging across VCS (.vdb) and Xcelium"
cards: [t-merge-1, t-merge-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  A["run A<br/>RTL rev 1"] --> M{"merge"}
  B["run B<br/>RTL rev 2 (design changed)"] --> M
  M -->|"strict"| S["only identical<br/>coverage models merge"]
  M -->|"flexible merge"| F["union of covergroup items;<br/>changed bins handled by rules"]
  V[".vdb (VCS)"] -.->|"different DB formats"| XC["Xcelium coverage DB"]
```

## Explain-back check
- What does a flexible merge do when a covergroup changed between two RTL versions?
- What's your plan for VCS and Xcelium coverage during the transition?

## Evidence
- 2026-10-06 — Q12 incorrect, Q29 open

## Links
- [[coverage-group-vs-instance]]
- [[vcs-vs-xcelium]]
