---
title: Scoreboard pop condition: rd_valid alone
lane: sv
status: learning
gaps:
  - "rd_en && rd_valid skew trap; scoreboard must pop on rd_valid alone"
cards: [c-fifo-1, c-fifo-2]
interactive: "interactive/fifo-scoreboard.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  W["wr_en && wr_ready"] -->|push_back din| Q[("reference queue")]
  Q -->|pop_front| C{"compare with dout"}
  V["rd_valid (alone)"] --> C
  X["rd_en && rd_valid"]:::bad -.->|"misses the last beat;<br/>blind to rd_valid bugs"| C
  classDef bad fill:#f3dde1,stroke:#b4707e
```

▶ **Interactive:** [fifo scoreboard](../interactive/fifo-scoreboard.html)

## Explain-back check
- With 1-cycle read latency, on which cycle is `rd_en && rd_valid` true for a single read?
- Why does gating the pop on `rd_en` hide a DUT that raises `rd_valid` spuriously?

## Evidence
- 2026-10 (FIFO project) — scoreboard architecture decided: push on wr_en && wr_ready, pop on rd_valid

## Links
- [[dut-vs-tb-verdict]]
