---
title: config_db, virtual interfaces and bind
lane: sv
status: learning
gaps:
  - "bind sets the vif into config_db, component gets it"
  - "Why each bound copy sees its own instance clock (bind resolves names in the target scope)"
  - "Multi-instance hierarchy binding"
cards: [c-bind-1, c-bind-2, c-bind-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TB
  subgraph DUT["DUT hierarchy"]
    E0["dma_eng[0]"] --- B0["bound checker_if #0<br/>clk = dma_eng[0].clk"]
    E1["dma_eng[1]"] --- B1["bound checker_if #1<br/>clk = dma_eng[1].clk"]
  end
  B0 -- "config_db::set(path0, vif)" --> DB[("uvm_config_db")]
  B1 -- "config_db::set(path1, vif)" --> DB
  DB -- "config_db::get(this, vif)" --> K0["checker[0]"]
  DB -- "config_db::get(this, vif)" --> K1["checker[1]"]
```

## Explain-back check
- In a `bind`, whose scope are the port names resolved in, and why does that give each copy its own clock?
- Who calls `config_db::set` and who calls `get` for a bound interface? What happens if the paths don't match?
- Trigger vs root cause for the multi-instance checker failure: say each in one sentence.

## Evidence
- 2026-10-28 — confirmed: bind sets vif into config_db, component gets it; single-instance binding was the root

## Links
- [[uvm-hdl-read]]
- [[dut-vs-tb-verdict]]
