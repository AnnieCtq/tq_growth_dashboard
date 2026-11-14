---
title: RAL frontdoor: the path of reg.write()
lane: sv
status: learning
gaps:
  - "RAL frontdoor internals: map, adapter reg2bus/bus2reg, UVC sequencer, mirror and prediction"
cards: [c-ral-1, c-ral-2, c-ral-3]
interactive: "interactive/ral-frontdoor.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
sequenceDiagram
  participant T as test / sequence
  participant R as uvm_reg (model)
  participant M as uvm_reg_map
  participant A as adapter
  participant S as bus sequencer/driver
  participant D as DUT
  participant P as predictor (on monitor)
  T->>R: reg.write(status, val)
  R->>M: do_write(rw)
  M->>A: reg2bus(rw) → bus item
  A->>S: start item on sequencer
  S->>D: drive bus transaction
  D-->>S: response
  S-->>A: bus2reg(item) → rw.status
  D-->>P: monitor observes transaction
  P->>R: predict() → mirror updated
```

▶ **Interactive:** [ral frontdoor](../interactive/ral-frontdoor.html)

## Explain-back check
- Name each hop of a frontdoor write, and which class owns it.
- What do reg2bus and bus2reg convert between?
- Explicit vs auto prediction: who updates the mirror in each?

## Evidence
- 2026-10 — frontdoor work done at the job; mechanism not yet explained back
- 2026-10-29 — 3-day sandbox project started

## Links
- [[frontdoor-vs-backdoor]]
