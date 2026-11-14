#!/usr/bin/env python3
"""Assemble the GitHub Pages site into _site/.

Copies site/ (pages, assets) plus the repo's data, records and kb folders, and
writes manifest.json so the static pages know which files exist.

  python3 scripts/build_site.py            # build into ./_site
  python3 -m http.server -d _site 8000     # preview at http://localhost:8000
"""
from __future__ import annotations

import json
import re
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"


def frontmatter(text: str) -> dict:
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.S)
    if not m:
        return {}
    data: dict = {}
    key = None
    for raw in m.group(1).splitlines():
        line = re.sub(r"\s+#.*$", "", raw)
        item = re.match(r"^\s+-\s+(.*)$", line)
        if item and key:
            data.setdefault(key, [])
            if isinstance(data[key], list):
                data[key].append(item.group(1).strip().strip("\"'"))
            continue
        kv = re.match(r"^([\w-]+):\s*(.*)$", line)
        if not kv:
            continue
        key, v = kv.group(1), kv.group(2).strip()
        if v in ("", "[]"):
            data[key] = []
        elif v.startswith("[") and v.endswith("]"):
            data[key] = [s.strip().strip("\"'") for s in v[1:-1].split(",") if s.strip()]
        else:
            data[key] = v.strip("\"'")
    return data


def first_heading(text: str) -> str | None:
    m = re.search(r"^#\s+(.+)$", text, re.M)
    return m.group(1).strip() if m else None


def main() -> int:
    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(ROOT / "site", OUT)
    for d in ("data", "records", "kb"):
        shutil.copytree(ROOT / d, OUT / d)

    reports = []
    for p in sorted((ROOT / "data/reports").glob("*.md")):
        fm = frontmatter(p.read_text(encoding="utf-8"))
        reports.append({"path": f"data/reports/{p.name}", "date": fm.get("date", p.name[:10]), "title": fm.get("title", p.stem), "kind": fm.get("kind", "weekly")})

    daily = []
    for p in sorted((ROOT / "data/daily").glob("*.json")):
        try:
            daily.append(json.loads(p.read_text(encoding="utf-8")))
        except json.JSONDecodeError as e:
            print(f"warning: skipping {p.name}: {e}", file=sys.stderr)

    notes = []
    for p in sorted((ROOT / "kb").rglob("*.md")):
        rel = p.relative_to(ROOT).as_posix()
        if p.name.startswith("_"):
            continue
        text = p.read_text(encoding="utf-8")
        fm = frontmatter(text)
        folder = p.parent.relative_to(ROOT / "kb").as_posix()
        written = bool(re.search(r"## In my own words\s*\n(?!\s*> _Not written yet)", text))
        notes.append({
            "path": rel, "slug": p.stem, "folder": "" if folder == "." else folder,
            "title": fm.get("title") or first_heading(text) or p.stem,
            "lane": fm.get("lane", ""), "status": fm.get("status", ""),
            "gaps": fm.get("gaps", []), "cards": fm.get("cards", []),
            "interactive": fm.get("interactive", ""), "updated": fm.get("updated", ""),
            "written": written,
        })

    decks = [f"kb/cards/{p.name}" for p in sorted((ROOT / "kb/cards").glob("*.json"))]
    interactive = []
    for p in sorted((ROOT / "kb/interactive").glob("*.html")):
        t = re.search(r"<title>(.*?)</title>", p.read_text(encoding="utf-8"), re.S)
        d = re.search(r'<meta name="description" content="(.*?)"', p.read_text(encoding="utf-8"))
        interactive.append({"path": f"kb/interactive/{p.name}", "title": t.group(1).strip() if t else p.stem, "description": d.group(1) if d else ""})

    manifest = {
        "built": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "reports": reports, "daily": daily, "notes": notes, "decks": decks, "interactive": interactive,
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=1, ensure_ascii=False), encoding="utf-8")
    (OUT / ".nojekyll").write_text("")
    print(f"built _site: {len(reports)} reports, {len(daily)} days, {len(notes)} notes, {len(decks)} decks, {len(interactive)} interactive")
    return 0


if __name__ == "__main__":
    sys.exit(main())
