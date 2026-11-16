# ACC frontdoor project

A 3-day guided project from the DE + DV coach (planned 29 Oct to 2 Nov 2026): rebuild ACC frontdoor register access in a personal sandbox, using the existing ACC register model and the sideband-bus (SB) UVC, until every step can be explained back.

| Day | Task | Done when |
|---|---|---|
| 1 | Trace the map and the SB item, fill in the contract block, write `reg2bus` and `bus2reg` in `acc_sb_adapter.sv`, then compare with the team's adapter | I can explain how one `REG.write()` reaches the bus (Q5) |
| 2 | Connect the map to the SB sequencer, choose how the mirror is updated, check an RW, an RO and a side-effect register | I can explain how a read value reaches the model and how the mirror stays in sync (Q6) |
| 3 | Frontdoor vs backdoor experiments, then four injected bugs written up as trigger / root cause / DUT or TB / fix | I can answer Q7 from my own results |

Status lives on the Tasks page (`data/tasks.json`). The skeleton here has the structure and hints only; the mapping logic is mine to write. Real code from work stays at work.
