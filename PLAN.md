# Plan: move to GitHub + knowledge base

Agreed 2026-11-14.

## Decisions
| Question | Decision |
|---|---|
| Repo visibility | **Public, scrubbed.** No company, IP, block, people or tool names. A denylist is kept outside the repo and enforced by the pre-commit hook and CI |
| Source of truth | **GitHub.** Records, logs, KB and practice progress are files, so every change is a commit |
| Where the dashboard runs | **GitHub Pages** (option A). Agent chat panels move into Claude sessions that read and commit to the repo. The old Claude dashboard can stay as-is for its live panels |
| KB authorship | **I write, agents verify.** Agents never write *In my own words*. Only a reviewer can mark a note `proven` |
| KB scope | SV/UVM & DPI-C concepts, tools & flows, debug playbooks, glossary & interview prep, **lots of diagrams (interactive where possible)** |
| Extra | **Daily knowledge practice** with spaced-repetition cards |

## Phases
- [x] **1. Scrub safely:** `scripts/scrub_check.py`, `.githooks/pre-commit`, CI check, scrubbed every imported file
- [x] **2. Bring files over:** 6 agent skills → `agents/`; historian, gaps, context, contract → `records/`; 12 weekly reports, the October tasks and the 30-question assessment → `data/reports/`; evaluations and gap snapshots → `data/`
- [x] **3. GitHub as source:** Pages site reads the repo; Daily log, self-rating and practice write back through a fine-grained token; `agents/REPO_PROTOCOL.md` tells agents what to read and write
- [x] **4. Knowledge base:** 22 seeded notes (diagram + explain-back + predict-the-bug + evidence, *my words* left blank), glossary (56 terms), interview prep (30 questions)
- [x] **5. Diagrams:** Mermaid in every note, plus 5 interactive pages: SV scheduling stepper, clocking-block skew, FIFO scoreboard trap, coverage calculator, RAL frontdoor/backdoor walkthrough
- [x] **6. Daily practice:** 52 cards linked to notes, Leitner boxes, 5 new cards a day, streak and heatmap, ✔ glossary rows become cards
- [ ] **7. Me:** turn on Pages (Source: GitHub Actions), add the `SCRUB_TERMS` secret, set up the local hook and denylist, connect a token on the site
- [ ] **8. Skills:** update the six account skills so they follow `agents/REPO_PROTOCOL.md` (paths in the repo instead of `/mnt/user-data/outputs/`)
- [ ] **9. Habit:** daily log + practice every workday; write one KB note a week, starting with notes whose gap is *closing*

## Later ideas
- Rebuild `scrub_check.py` myself with the automation coach (regex, file I/O, exit codes: the next Python steps anyway)
- More interactive pages: UVM phasing timeline, DPI-C type-mapping quiz, seed-sweep comparison simulator
- A reviewer “mock interview” mode built from `kb/interview-prep.md`
