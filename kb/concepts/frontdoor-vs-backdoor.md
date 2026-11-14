---
title: Frontdoor vs backdoor register access
lane: sv
status: learning
gaps:
  - "What frontdoor verifies that backdoor skips (bus path, decode, access policy)"
  - "Backdoor access: direct DUT access, internal signals, speed"
cards: [c-fb-1, c-fb-2]
interactive: "interactive/ral-frontdoor.html"
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  subgraph FD["Frontdoor"]
    direction LR
    f1["reg model"] --> f2["adapter"] --> f3["bus driver"] --> f4["bus interface"] --> f5["address decode"] --> f6["access policy (RW/RO/W1C)"] --> f7[("register flop")]
  end
  subgraph BD["Backdoor"]
    direction LR
    b1["reg model"] --> b2["hdl_path (DPI / uvm_hdl)"] --> b3[("register flop")]
  end
```

▶ **Interactive:** [ral frontdoor](../interactive/ral-frontdoor.html)

## Explain-back check
- Name three things a frontdoor access exercises that a backdoor skips.
- Give two good reasons to use backdoor anyway.
- Where does DPI-C sit in a backdoor access?

## Evidence
- 2026-10-06 — Q24 definition confirmed, 'why' missing
- 2026-10-28 — confirmed: direct DUT access, internal signals, speed

## Links
- [[ral-frontdoor-path]]
- [[dpi-c-boundary]]
