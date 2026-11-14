---
title: uvm_hdl_read and string paths
lane: sv
status: learning
gaps:
  - "uvm_hdl_read wrong path fails at runtime, stale value gives misleading mismatch; check return"
cards: [c-hdl-1, c-hdl-2]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  P["path string<br/>'tb.dut.eng[1].status'"] --> R{"uvm_hdl_read(path, val)"}
  R -->|"path exists → returns 1"| V["val updated"]
  R -->|"wrong path → returns 0<br/>(compiles fine!)"| S["val NOT updated<br/>stale value compared"]:::bad
  S --> M["misleading mismatch"]:::bad
  classDef bad fill:#f3dde1,stroke:#b4707e
```

## Explain-back check
- Why does a typo in a uvm_hdl_read path compile cleanly?
- What should the caller do with the return value?

## Predict the bug
What's wrong, and what would you see in simulation?
```systemverilog
bit [31:0] v;
uvm_hdl_read($sformatf("tb.dut.eng[%0d].stat", i), v);
if (v != exp) `uvm_error("CHK", "mismatch")
```

## Evidence
- 2026-10-28 — confirmed after second explain-back

## Links
- [[config-db-and-bind]]
- [[frontdoor-vs-backdoor]]
