---
title: Clocking block direction and skew
lane: sv
status: learning
gaps:
  - "Clocking-block direction is TB-role-relative, not DUT-port-relative"
cards: [c-cb-1, c-cb-2, c-cb-3]
interactive: "interactive/clocking-skew.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  subgraph DRV["Driver clocking block"]
    o1["output wr_en, din"]:::out
    i1["input full"]:::in
  end
  subgraph MON["Monitor clocking block"]
    i2["input wr_en, din, full,<br/>rd_valid, dout"]:::in
  end
  DUT[("DUT")]
  o1 -- "drives #output_skew after edge" --> DUT
  DUT -- "sampled #input_skew before edge" --> i1
  DUT -- "sampled only" --> i2
  classDef out fill:#dbe6f2,stroke:#5b7fa6
  classDef in fill:#dcefe8,stroke:#4f8c7a
```

▶ **Interactive:** [clocking skew](../interactive/clocking-skew.html)

## Explain-back check
- Is direction in a clocking block decided by the DUT's ports or by the component using it? Give the monitor as an example.
- With `default input #1step output #2;`, when is an input sampled and when is an output driven?
- Why does the monitor's clocking block contain only inputs?

## Predict the bug
What's wrong, and what would you see in simulation?
```systemverilog
clocking mon_cb @(posedge clk);
  output wr_en, din;   // monitor clocking block
  input  full, dout;
endclocking
```

## Evidence
- 2026-10 (FIFO project) — decided: monitor clocking block is all `input`

## Links
- [[sv-evaluation-timing]]
