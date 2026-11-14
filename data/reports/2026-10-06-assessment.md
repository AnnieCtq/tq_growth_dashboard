---
date: 2026-10-06
title: "Assessment: 30-question junior DV check"
kind: assessment
---

# Assessment: 30-question junior DV check (DE + DV coach), 6 Oct 2026

Background: multimedia graduate, 3 months of DV study, 5 months of DE work, then regression owner from mid-July 2026. Answered without AI as a comprehension check.

## Ratings (1 aware, 2 guided, 3 independent on routine work, 4 independent on complex work, 5 owns the area)
- Regression flow and ownership: 2.5 (junior band 2–3)
- Workspace and Perforce: 2.5–3 (band 2–3)
- Coverage concepts: 1.5 (band 1–3)
- Compile and elaboration debug: 2–2.5 (band 2–3)
- Test-level debug and UVM: 1.5 (band 2–3)
- Spec, design and DPI-C: 1.5 (band 2–3)
- Xcelium migration: 2 (band 2–3)
- Habits and communication: 3 (band 2–3)

Overall: on track or ahead operationally for time in role; core verification concepts at entry level, coverage the most urgent because the team relies on those numbers.

Pattern: answers often described what the flow does, or answered a nearby question, rather than why it behaves that way and how it fails. That is the step from operating a system to owning it.

## Next month, in order
1. Coverage explained back from your own URG report: type vs instance score, code vs functional, what means the plan is done.
2. Three failure paths in your own scripts: crash before limit release, cron overlap, why vcs_run.log is deleted (with the automation coach).
3. Rewrite the VCS vs Xcelium comparison criteria without assuming seed equivalence; update the HTML guide.
Ongoing: test-level debug through the Project C bring-up.

## Questions, answers and verdicts

### Regression flow and ownership
1. Nightly regression from trigger to signature mail: stages, owners, log locations.
Answer: The regression wrapper script finishes the regression, greps the important information from the log files, then sends it to the relevant group mail lists.
Verdict: Partial. One script named; the stages between trigger and mail (sync, build flow, LSF submission, simulation, parsing, coverage, mail) and log locations not described.

2. Why the flow deleted vcs_run.log, and keeping failures debuggable.
Answer: The script was already like this before I took over.
Verdict: Not answered. As owner, know the reason (likely disk space) and the trade-off.

3. Limit release if the process crashes or the machine reboots.
Answer: We make sure the regression is released on the right status, and include pending status to avoid visualization errors.
Verdict: Answered a nearby question. Open risk: a crash before a status is reported may leave the limit locked.

4. What a kill stops and how to confirm.
Answer: The wrapper script stops the LSF jobs; the regression log file can double-confirm, but it usually works.
Verdict: Partial-good. Add a check of the scheduler queue for leftover jobs.

5. Cron firing while last night's regression still runs.
Answer: The LSF job will kill the active job; in other states it will pend.
Verdict: Unclear. Verify the actual behaviour and decide what it should be.

6. Regression not run for over a week: first three checks.
Answer: Recent error logs, then the schedule, then the usage need, because it usually stops due to build-flow failure before the regression starts; if not in schedule it isn't needed now.
Verdict: Confirmed. Good order with sound reasoning.

### Workspace and Perforce
7. Shelved vs submitted changelist; why a shelve regression needs its base changelist.
Answer: A shelved CL is not submitted yet; shelve regression tests the changelist's compatibility; the base changelist gives a clean start.
Verdict: Confirmed core. Refine: a shelve is a set of changes relative to its base, so it must apply onto that base.

8. Components de-sync: meaning, detection, fix.
Answer: Components or CL de-sync, or files not resolved or merged; we check and contact the person in charge; automating is risky because CL importance is unknown.
Verdict: Partial. Good judgement about not automating; detection and actual fix not described.

9. Branch tree for Project C instead of mainline at a label.
Answer: The first milestone needs a specific version, needed by the System on Chip group.
Verdict: Confirmed.

10. A hardcoded value you removed.
Answer: A condition that grepped a specific regression three times, replaced with a regression variant so other projects need no change (guided by a senior).
Verdict: Good, honest. Missing: how you checked nothing else depended on it.

### Coverage
11. Covergroup score vs instance score.
Answer: Instance score is the median covering all group score percentages; covergroup score is the specific score for one covergroup.
Verdict: Not yet confirmed. The written answer reversed the roles (instance as the aggregate, group as one covergroup) and "median" isn't how either score works. Coach correction: the earlier explanation was oversimplified. How the type (group) score relates to instance scores depends on settings. With type_option.merge_instances = 1, or without per-instance tracking, it is the union of bins hit by any instance. With per-instance tracking on and the LRM default merge_instances = 0, it is a weighted average of the instance scores. Re-check: compare group and instance scores for one per-instance covergroup in your own URG report and say which mode your flow uses.

12. Merging runs compiled from different RTL; root cause of the subsystem merge issue.
Answer: The merge syncs the latest CL no matter what; only waivers are affected; root cause was de-sync.
Verdict: Incorrect on merge semantics. Look at what flex_merge resolves when the design changed.

13. Why back up .vdb files.
Answer: Someone deleted the whole directory without consent; accumulated coverage over 5 months was lost.
Verdict: Good real-world reason. Missing: a retention policy.

14. How waivers are decided and approved; risk of broad waivers.
Answer: Usually depends on the designer; everything got waived when only a small section should be, which is bad practice.
Verdict: Partial-good. Add: waivers need a documented reason and review by DV, not designer alone.

15. Code or functional coverage from the coverage-generation script; which shows plan completion.
Answer: Both; it can send email after generation.
Verdict: Second half not answered. Functional coverage is tied to the verification plan.

16. Stress coverage regression vs normal.
Answer: Tests; it acts as a smoke test regression.
Verdict: Incorrect. Smoke is short and quick; stress uses many seeds, long runs and heavy randomisation to find corner cases.

### Debug
17. Compile stage for unidentified macro, undeclared identifier, missing input/register.
Answer: All in the build flow before VCS; I use my alias to find the failed .log.gz files, check their logs and bucket them.
Verdict: Good practical triage; stages not distinguished (preprocess, parse, elaborate).

18. Finding which filelist or include path should pull in a missing file.
Answer: There was a typo in the filelist.
Verdict: Gave an instance, not the method.

19. Smallest vs biggest test.
Answer: The biggest test exercises a bigger chip structure and more iterations, so more chance to find bugs.
Verdict: Half. The smallest test isolates setup problems from test complexity.

20. First 15 minutes on a scoreboard UVM_ERROR.
Answer: Check the error, find where it came from, understand the structure, look at which signal failed and the logic.
Verdict: Right direction, generic. Add: expected vs actual against the spec, reproduce with the seed, waveform at the failure time.

21. UVM objections; never dropping one.
Answer: Raises a certain activity in the testbench; the test will never start or never end.
Verdict: Half. Never raised: run phase ends at time 0. Never dropped: hangs until timeout.

22. A debug you're proud of.
Answer: The unidentified macro: checked the hierarchy in the block config file, found which config it came from and added it, using my own notes from a previous occurrence.
Verdict: Confirmed. Strong habit.

### Spec, design and DPI-C
23. MAS vs spec; what to look for first.
Answer: It's the specs of the chip, the source of truth; check the signal table and lookup table.
Verdict: Partial. MAS is the micro-architecture spec (how it's built), not the functional spec (what it should do).

24. Backdoor access: what, why, what breaks.
Answer: Access without bus transactions; the build flow shows the path is incorrect and can't fetch signals.
Verdict: Definition confirmed; why it's used not answered.

25. DPI-C in the backdoor flow.
Answer: Golden model or checkers.
Verdict: Not yet understood. Joint gap with the DPI-C + C++ coach.

26. Build-flow tool's role.
Answer: Helps start regressions; learned from slides, working files and AI-made notes.
Verdict: Vague on role; good learning process.

### VCS to Xcelium
27. Two differences that break the flow.
Answer: Custom bootenv for the regression script; the tools differ in how they write coverage.
Verdict: Partial. Right areas, no concrete switches or formats.

28. What counts as "the same" result.
Answer: Same regression with the same CL and seed, faster or equally accurate; sim time OK but hopefully not slower.
Verdict: Misconception with project impact. The same seed does not give the same stimulus across simulators; compare across seed sweeps.

29. Merging VCS and Xcelium coverage.
Answer: Not yet discovered; we will run both concurrently.
Verdict: Honest. Open.

### Working with AI
30. Checking AI explanations against your flow.
Answer: I feed AI the relevant documents and files to cross-check; hallucination can lead me to another topic.
Verdict: Partial. No concrete example; verify against the script source, the tool, or a senior.
