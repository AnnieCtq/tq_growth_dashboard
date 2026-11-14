---
title: UVM phasing and objections
lane: sv
status: learning
gaps:
  - "Objections: never raised (ends at time 0) vs never dropped (hangs until timeout)"
cards: [c-obj-1, c-obj-2, c-obj-3]
interactive: ""
updated: 2026-11-14
---

## In my own words
> _Not written yet. Write this yourself, without AI: what it is, why it exists, how it fails. A reviewer checks it before this note becomes `proven`._

## Diagram
```mermaid
flowchart TD
  B["build_phase (top-down)"] --> CN["connect_phase (bottom-up)"]
  CN --> EOE["end_of_elaboration"] --> SOS["start_of_simulation"]
  SOS --> RUN["run_phase (time-consuming, all components in parallel)"]
  RUN --> EX["extract"] --> CH["check"] --> RP["report"] --> FN["final"]
  RUN -.-> O{"objection count"}
  O -->|"0 and never raised"| Z["ends at time 0"]:::bad
  O -->|"raised, never dropped"| H["hangs until global timeout"]:::bad
  O -->|"raised then dropped"| OK["run phase ends cleanly"]
  classDef bad fill:#f3dde1,stroke:#b4707e
```

## Explain-back check
- What happens if a test never raises an objection? Never drops one?
- Which phases consume simulation time?
- Why does build_phase go top-down but connect_phase bottom-up?

## Predict the bug
What's wrong, and what would you see in simulation?
```systemverilog
task run_phase(uvm_phase phase);
  my_seq seq = my_seq::type_id::create("seq");
  seq.start(env.agt.sqr);
endtask
```

## Evidence
- 2026-10-06 — assessment Q21: half right

## Links
- [[config-db-and-bind]]
