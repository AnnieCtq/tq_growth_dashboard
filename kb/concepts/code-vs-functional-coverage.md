---
title: Code vs functional coverage, and what coverage can't tell you
lane: sv
status: learning
gaps:
  - "Functional coverage: chosen from the verification plan, and the one that shows the plan is complete"
  - "Coverage records, it does not check"
cards: [c-fcov-1, c-fcov-2, c-fcov-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart LR
  VP["verification plan<br/>(from functional spec)"] --> FC["functional coverage<br/>covergroups, assertions cover"]
  RTL["RTL source"] --> CC["code coverage<br/>line, toggle, FSM, branch"]
  FC --> Q1{"Did we test<br/>what the plan asks?"}
  CC --> Q2{"Did we execute<br/>all the code?"}
  SB["scoreboard / checkers"] --> Q3{"Was the result<br/>correct?"}
  Q1 & Q2 -.->|"coverage alone can't answer"| Q3
```

## Explain-back check
- Who chooses the covergroups, and from which document?
- Why does 100% coverage with a disabled scoreboard prove nothing?
- Which kind shows the plan is complete, and which can hit 100% while a feature is missing?

## Evidence
- 2026-10-28 — confirmed: coverage records, it does not check

## Links
- [[coverage-group-vs-instance]]
- [[stress-vs-smoke]]
