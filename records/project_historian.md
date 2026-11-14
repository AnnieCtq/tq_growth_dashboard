# Project Historian

<!-- Append-only log. One "## YYYY-MM-DD — <agent> session: <title>" entry per session.
     Sections the dashboard reads: Session Summary, Knowledge Gained, Next Session Tasks, Project Progress, Completed. -->

## 2026-10-06 — DE+DV Coach session: 30-question junior DV assessment
**Session Summary**
Assessment against the junior DV benchmark, based on the weekly summaries for 13 Jul to 2 Oct 2026 (regression owner role, Project C sanity bring-up, VCS to Xcelium research). Thirty questions were answered without AI, as a comprehension check. Background taken into account: multimedia graduate, 3 months of DV study, 5 months of DE work, then about 12 weeks as regression owner.
**Knowledge Gained**
- Triage order for a regression that stopped running (error logs, then schedule, then usage need), with correct reasoning that build-flow failures stop runs before they start
- Shelved versus submitted changelists, and why a shelve regression needs its base changelist
- Why a release needs a branch tree rather than mainline (milestone pinned to a version for the SoC group)
- Diagnosing an unidentified macro by tracing the config hierarchy in the block config file (own debug, done from personal notes without AI)
- Definition of backdoor access (access without bus transactions)
**Next Session Tasks**
- Coverage concepts: explain back the difference between covergroup type and instance scores, code vs functional coverage, and stress vs smoke, using your own URG report
- Trace three failure paths in your regression scripts: process crash vs limit release, cron overlap, and why vcs_run.log is deleted
- Xcelium migration: rewrite the VCS vs Xcelium comparison criteria without assuming seed-for-seed equivalence
**Project Progress**
- Completed: regression ownership baseline; regression portal enhancements; Project C smallest-test bring-up in progress; Xcelium research started
- Pending: coverage concept closure; test-level debug practice; DPI-C backdoor flow understanding
- Blocked: none

## 2026-10-28 — DE+DV Coach session: Week 1 coverage scores explain-back
**Session Summary**
Week 1 of the 12-week ramp (coverage scores). Explain-back of group vs instance scores, union vs average modes, and code vs functional coverage, plus a worked 4-bin, 2-instance example. Checked the flow's mode in Verdi.
**Knowledge Gained**
- Union vs average group scores: computed union 75% and average 50% for the 4-bin, 2-instance example (confirmed after one hint on the arithmetic)
- Coverage only records what simulation exercised; it does not check correctness, so 100% coverage with a disabled scoreboard says nothing about whether the DUT works (confirmed)
- The team's flow computes the covergroup group score as the average of instance scores (observed in Verdi)
**Next Session Tasks**
- One sentence: what a union-mode group score hides at sign-off (an instance can have uncovered bins while the group looks covered), and what average mode hides instead (which instance lags)
- Functional coverage: who chooses the covergroups and from which document; link it to verification plan completeness
- Week 2: spec first pass (one block, one-page summary)
**Project Progress**
- Completed: Week 1 calculation and mode check
- Pending: sign-off implication sentence; functional coverage and plan link
- Blocked: none

## 2026-10-28 — DE+DV Coach: significant work reported (Oct 2026), explain-back pending
**Session Summary**
Logged two testbench-level tasks done in October. First real evidence of test-level debug and UVM component work. Knowledge is not yet confirmed; explain-back questions set.
**Completed**
- Debugged the blk_status checker failing on multi-instance DMA engines: hierarchy paths read with uvm_hdl_read and per-instance clocks through virtual interfaces. Several days of reasoning plus 2 days of debugging, using another checker's uvm_hdl_read usage as reference. Cost about a week of regression-owner time.
- ACC_BE frontdoor register access with the RAL register model, adapter and sideband-bus UVC
**Next Session Tasks**
- Explain back the blk_status root cause, why uvm_hdl_read broke with multiple instances, and how each instance gets its clock
- Explain back the path of a RAL frontdoor write and read through the adapter and sideband-bus UVC, and how the mirror stays in sync
- Connect frontdoor vs backdoor (assessment Q24)
**Project Progress**
- Completed: blk_status multi-instance fix; ACC_BE frontdoor RAL access
- Pending: comprehension checks on both

## 2026-10-28 — DE+DV Coach session: explain-back on blk_status and ACC_BE RAL
**Session Summary**
Explain-back of the two October tasks. Answered without AI.
**Knowledge Gained**
- The blk_status checker's hierarchy binding only covered a single DMA-engine instance, so it broke with multiple instances (confirmed)
- uvm_hdl_read paths are strings, so a wrong path still compiles (confirmed; runtime behaviour still open)
- Backdoor access: direct access into the DUT, useful for internal signals and faster (confirmed)
**Next Session Tasks**
- Separate trigger (feature enabled the checker) from root cause (single-instance hierarchy binding); state DUT vs testbench
- What uvm_hdl_read does at runtime with a wrong path, and why the return value should be checked
- How bind gives each instance its own clock, and who sets / gets the virtual interface in config_db
- RAL frontdoor path: register model, map, adapter (reg2bus / bus2reg), sideband-bus UVC sequencer and driver; mirror and prediction
- What frontdoor verifies that backdoor skips
**Project Progress**
- Completed: explain-back partial for both tasks
- Pending: items above

## 2026-10-28 — DE+DV Coach session: second explain-back, blk_status and RAL
**Knowledge Gained**
- uvm_hdl_read with a wrong path fails at runtime and the checker compares a stale value, giving a misleading mismatch (confirmed; refine: the call returns 0, so check the return)
- In a bind setup, the bound interface sets its virtual interface into config_db and the component gets it (confirmed)
**Next Session Tasks**
- Re-judge DUT vs testbench for blk_status: which file did the fix change?
- Why a bound copy sees its own instance's clock (bind resolves names in the target scope)
- What frontdoor exercises in the DUT that backdoor skips (bus interface, address decode, access policies)
**Project Progress**
- Completed: interim UVM re-rating 1.5 to 2
- Pending: DUT vs TB verdict, bind scope, frontdoor value

## 2026-10-29 — DE+DV Coach: 3-day ACC frontdoor project kickoff
**Session Summary**
Started a 3-day guided project: rebuild ACC frontdoor register access in a personal sandbox using the existing ACC subsystem register model and the sideband-bus UVC. Goal: explain every hop of a frontdoor access (closes RAL internals gap) and find out by experiment what frontdoor verifies that backdoor skips (assessment Q24/Q7). Day 1 adapter skeleton issued.
**Next Session Tasks**
- Day 1 (Thu 29 Oct): trace the ACC map and SB item, fill the adapter contract, write reg2bus/bus2reg, diff against the team adapter; explain Q5 (path of reg.write)
- Day 2 (Fri 30 Oct): connect map to SB sequencer, add predictor on the SB monitor, write a check sequence on an RW, an RO and a side-effect register; explain Q6 (mirror and prediction)
- Day 3 (Mon 2 Nov): frontdoor vs backdoor experiments and four injected bugs with trigger / root cause / DUT or TB / fix write-ups; answer Q7 from results
**Project Progress**
- Completed: plan and Day 1 skeleton
- Pending: Days 1 to 3
- Blocked: none
