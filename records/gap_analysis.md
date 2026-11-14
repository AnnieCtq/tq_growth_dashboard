# Gap Analysis
**Last updated:** 2026-10-28

<!-- Living weakness snapshot (overwrite). Tags: [lane] text. Each closing gap should get a KB note: see kb/README.md -->

## Recurring weak areas
- [automation] Explaining why the regression flow behaves as it does, not only what it does: inherited log deletion, crash handling, cron overlap (recurring x3 within the assessment)

## New gaps
- [UVM coverage] Functional coverage: chosen from the verification plan, and the one that shows the plan is complete
- [UVM coverage] Sign-off meaning of the group score: what union mode hides (per-instance holes) vs what average mode hides (which instance lags)
- [UVM coverage] Stress regression confused with smoke/sanity regression
- [UVM coverage] Merge semantics when runs were compiled from different RTL (what flex_merge resolves)
- [UVM sim semantics] Assuming the same seed gives the same stimulus on VCS and Xcelium. This affects the migration comparison plan
- [UVM] Objections: what happens if a test never raises one (ends at time 0) vs never drops one (hangs until timeout)
- [design-reading] Compile stages: preprocessing (macros) vs parse (undeclared identifiers) vs elaboration (missing ports or hierarchy)
- [design-reading] MAS (micro-architecture spec) vs architecture/functional spec

## Gaps closing
- [UVM] uvm_hdl_read wrong path fails at runtime, stale value gives misleading mismatch; check return. Confirmed 2026-10-28
- [UVM] bind sets the vif into config_db, component gets it. Confirmed 2026-10-28
- [UVM] Multi-instance hierarchy binding (blk_status checker bound to one DMA-engine instance only). Confirmed 2026-10-28
- [design-reading] Backdoor access: direct DUT access, internal signals, speed. Confirmed 2026-10-28
- [UVM coverage] Group vs instance score, union vs average modes. Calculated correctly with one hint and flow mode identified as average in Verdi, 2026-10-28
- [UVM coverage] Coverage records, it does not check. Confirmed 2026-10-28
- [automation] Regression-not-running triage order. Confirmed 2026-10-06
- [design-reading] Config hierarchy tracing for macro errors. Confirmed 2026-10-06 (own debug, from notes)

## Still open
- [UVM] Root cause vs trigger in debug write-ups
- [UVM] DUT vs testbench verdict: blk_status judged DUT, but the fix was in the checker binding (re-judge)
- [UVM] Why each bound copy sees its own instance clock (bind resolves names in the target scope)
- [UVM] RAL frontdoor internals: map, adapter reg2bus/bus2reg, UVC sequencer, mirror and prediction (work done, mechanism not yet explained)
- [design-reading] What frontdoor verifies that backdoor skips (bus path, decode, access policy)
- [UVM] Scoreboard failure triage: deciding DUT bug vs testbench bug beyond a generic read-the-error approach
- [DPI seam-SV] Where DPI-C sits in the backdoor flow, and what crosses the boundary (no evidence yet; owned jointly with the DPI-C + C++ coach)
- [design-reading] Purpose of the smallest test in bring-up (isolating setup from test complexity)
- [automation] Coverage database merging across VCS (.vdb) and Xcelium during the transition
