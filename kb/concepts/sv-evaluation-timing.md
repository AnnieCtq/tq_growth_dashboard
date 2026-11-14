---
title: When SystemVerilog evaluates an expression
lane: sv
status: learning
gaps:
  - "Recurring root: when SV evaluates expressions (elaboration vs runtime vs clock edge vs continuous assignment)"
cards: [c-eval-1, c-eval-2, c-eval-3]
interactive: "interactive/sv-scheduling.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TD
  E["Elaboration<br/>parameters, $bits, $clog2, generate"] --> T0["Time 0<br/>variable initialisers<br/>logic x = expr;  runs ONCE"]
  T0 --> R{"Runtime"}
  R --> CA["Continuous<br/>assign y = expr;<br/>re-evaluates whenever expr changes"]
  R --> AC["always_comb<br/>re-evaluates on any input change"]
  R --> FF["always_ff @(posedge clk)<br/>evaluates only at the clock edge"]
  style T0 fill:#f6e3c5,stroke:#b9853a
```

▶ **Interactive:** [sv scheduling](../interactive/sv-scheduling.html)

## Explain-back check
- Why does `logic do_write = wr_en && !full;` freeze, while `assign do_write = wr_en && !full;` doesn't?
- What does `$bits(DEPTH)` return when `DEPTH` is an `int` parameter, and what did you actually want?
- List the four 'moments' an expression can be evaluated, with one construct for each.

## Predict the bug
What's wrong, and what would you see in simulation?
```systemverilog
logic [3:0] count;
logic do_write = wr_en && !full;   // intended: follows wr_en every cycle
always_ff @(posedge clk) if (do_write) count <= count + 1;
```

## Evidence
- 2026-10 (FIFO project) — two bugs traced to this root: time-zero initialiser and `$bits` on an int parameter

## Links
- [[blocking-vs-nonblocking]]
- [[clocking-block-direction]]
