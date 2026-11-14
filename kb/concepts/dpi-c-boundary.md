---
title: The DPI-C boundary
lane: dpi
status: learning
gaps:
  - "Where DPI-C sits in the backdoor flow, and what crosses the boundary"
cards: [c-dpi-1, c-dpi-2, c-dpi-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  subgraph SV["SystemVerilog side (DE+DV coach)"]
    imp["import #quot;DPI-C#quot; function int ref_model(input int a, output int b);"]
    exp["export #quot;DPI-C#quot; task sv_wait_clk;"]
  end
  subgraph C["C/C++ side (DPI-C coach)"]
    cf["extern #quot;C#quot; int ref_model(int a, int* b)"]
    cw["sv_wait_clk() called from C"]
  end
  imp == "same signature, svdpi.h types" ==> cf
  cw == "context import needed" ==> exp
  B["build: compile .cpp → .so<br/>-sv_lib name at run"] -.-> C
```

## Explain-back check
- Name the type mapping for `int`, `bit [31:0]`, `string` and an open array across DPI-C.
- When does an import have to be `context` instead of `pure`?
- Who allocates and who frees memory passed across the boundary?

## Evidence
- 2026-10-06 — Q25: not yet understood (joint gap)

## Links
- [[frontdoor-vs-backdoor]]
