# 🌱 Verification growth

My design verification growth tracker: a dashboard, a daily log, a knowledge base with interactive diagrams, and a daily card-practice page. Everything is plain files in this repo, served as a static site with GitHub Pages.

| Page | What it shows |
|---|---|
| **Growth** (`index.html`) | Where I am, what's next, gaps by coach, sessions, what I've proven, weekly record, agent prompts |
| **Daily log** (`daily.html`) | Hours by area, focus, self-rating vs panel vs junior benchmark |
| **Knowledge** (`kb.html`) | Notes in my own words, Mermaid diagrams, interactive explainers |
| **Practice** (`practice.html`) | Spaced-repetition cards drawn from the knowledge base |

## Layout
```
site/        the pages (HTML/JS/CSS), built into _site/ by scripts/build_site.py
records/     the coaches' files: historian (append-only), gap analysis, session context, contract
data/        reports/ (main record), daily/, evaluations, gap snapshots, self rating, practice progress
kb/          knowledge base: concepts/, tools/, debug-playbooks/, glossary, interview prep, cards/, interactive/
agents/      the six coach/reviewer skills + REPO_PROTOCOL.md (how they read/write here)
scripts/     build_site.py, scrub_check.py
```

## Daily use
- **Log the day:** go to Daily log and click Save. With a token connected, this commits `data/daily/<date>.json`. Without one, the file downloads for you to add yourself.
- **Practise:** the Practice page shows about 5 new cards plus whatever is due. Sync pushes `data/practice/progress.json`.
- **Coach sessions:** on the Growth page, click *Copy prompt* and paste it into Claude. The agent reads the repo and commits its updates.
- **Write a note:** open it in Knowledge, click *Edit on GitHub*, and fill in *In my own words*. Then ask a reviewer to check it.

## One-time setup
1. **Pages:** Settings → Pages → Source: **GitHub Actions**.
2. **Scrub secret:** Settings → Secrets and variables → Actions → new secret `SCRUB_TERMS`, with one forbidden term per line.
3. **Local hook** (on each machine): `git config core.hooksPath .githooks`, then put the same terms in `~/.config/tq-scrub/denylist.txt`.
4. **Token for saving from the site:** create a fine-grained token at github.com/settings/personal-access-tokens, limited to this repo with *Contents: read and write*. Paste it under **Connect** on the site. It is stored only in that browser.

## Preview locally
```bash
python3 scripts/build_site.py && python3 -m http.server -d _site 8000
```
