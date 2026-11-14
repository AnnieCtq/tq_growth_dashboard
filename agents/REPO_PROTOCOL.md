# How the six agents work with this repo

The skills in this folder are copies of the six coach and reviewer skills in my Claude account, kept here for version history. The account copies are the ones that actually run. This file says where each agent reads and writes in the repo.

## Read first, in this order
1. `data/reports/`: weekly and significant-task reports. **This is the main record. Trust it over everything else when they disagree.**
2. `records/session_context.md`: the latest compressed context.
3. `records/gap_analysis.md`: the current weaknesses.
4. `records/project_historian.md`: the append-only session log.
5. `records/contract.md`: the DPI-C and build/link seam agreements.
6. `data/daily/*.json` (last 14 days), `data/evaluations.json`, `data/self_rating.json`
7. `kb/`: notes, with their `status` and the `## In my own words` section.

## Write at the end of a session (one commit per session)
| File | Rule |
|---|---|
| `records/project_historian.md` | **Append** one `## YYYY-MM-DD — <Agent> session: <title>` entry using the sections Session Summary / Knowledge Gained / Next Session Tasks / Project Progress |
| `records/gap_analysis.md` | **Overwrite.** Keep the four sections: Recurring weak areas / New gaps / Gaps closing / Still open. Lines are `- [lane] text` |
| `records/session_context.md` | **Overwrite** with the latest compressed context |
| `records/contract.md` | **Overwrite** when a seam agreement changes, and add a Change log line |
| `data/gap_snapshots.json` | Append `{date, open, recurring, closing}` |
| `data/evaluations.json` | Append a panel evaluation when asked to “evaluate me”. Use the same shape as the existing entries |
| `kb/**.md` | See below |
| `kb/cards/*.json` | Add practice cards for new notes (`author: "claude"`) |

## Knowledge base rules for agents
- **Never write the `## In my own words` section.** You can ask questions, give hints, draw a Mermaid diagram, and add explain-back questions, predict-the-bug snippets and cards.
- When a gap moves to *Gaps closing*, create the matching note from `kb/_template.md` if there isn't one, and list the gap under `gaps:`.
- **Only a reviewer changes `status` to `proven`**, and only after I've written my own words and answered its explain-back check correctly, without AI. Add a dated line under `## Evidence`.
- `teaching-ready` needs a diagram plus a predict-the-bug example that I can explain.
- If a later review finds the gap again, set the status back to `learning` and say why under Evidence.

## Scrub rule (public repo)
No company names, IP or block names, people's names, server, depot or file paths from work, or internal tool names. Use generic stand-ins (e.g. “the DMA IP”, “blk_status checker”, “sideband-bus UVC”). The pre-commit hook and CI check enforce a denylist that is kept outside the repo.
