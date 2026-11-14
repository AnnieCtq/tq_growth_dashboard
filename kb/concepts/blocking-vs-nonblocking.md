---
title: Blocking (=) vs non-blocking (<=)
lane: sv
status: learning
gaps:
  - "Blocking vs non-blocking discipline (= inside always_ff, <= on class fields)"
cards: [c-bnb-1, c-bnb-2, c-bnb-3]
interactive: "interactive/sv-scheduling.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
sequenceDiagram
  participant A as Active region
  participant N as NBA region
  Note over A: posedge clk
  A->>A: a = b   (updates NOW)
  A->>A: c = a   (sees NEW a)
  A->>N: x <= y  (schedules update)
  A->>N: z <= x  (reads OLD x)
  Note over N: all <= updates land together
  N-->>A: x, z updated -> wake dependent processes
```

▶ **Interactive:** [sv scheduling](../interactive/sv-scheduling.html)

## Explain-back check
- Two flops swap values: write it with `=` and with `<=`. Which one swaps, and why?
- Why must class fields in a UVM component never be assigned with `<=`?
- Which simulation region applies non-blocking updates?

## Predict the bug
What's wrong, and what would you see in simulation?
```systemverilog
always_ff @(posedge clk) begin
  q1 = d;
  q2 = q1;   // meant to be a 2-stage shift register
end
```

## Evidence
- _none yet_

## Links
- [[sv-evaluation-timing]]
