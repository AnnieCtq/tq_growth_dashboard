#!/usr/bin/env python3
"""Block commits that contain work-confidential terms.

The repo is public, so anything from the day job must be scrubbed before it
lands here. The list of forbidden terms is deliberately NOT stored in the repo
(it would reveal exactly what it hides). It is read from, in order:

  1. the SCRUB_TERMS environment variable (newline-separated; used by CI,
     filled from the repository secret of the same name)
  2. the file named by SCRUB_DENYLIST_FILE
  3. ~/.config/tq-scrub/denylist.txt

Lines starting with '#' and blank lines are ignored. Matching is
case-insensitive. Terms made only of letters/digits/underscores match whole
words; anything else (e.g. ".ext", "two words") matches as a substring.
Third-party code under site/vendor/ is skipped.

Usage:
  scrub_check.py --staged        check files staged for commit (pre-commit hook)
  scrub_check.py --all           check every tracked file (CI)
  scrub_check.py FILE [FILE...]  check specific files

Exit codes: 0 clean, 1 forbidden term found, 2 no denylist configured.
"""
from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path

SKIP_DIRS = ("site/vendor/",)
SKIP_SUFFIXES = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico", ".woff", ".woff2", ".pdf"}


def load_terms() -> list[str]:
    raw = os.environ.get("SCRUB_TERMS")
    if not raw:
        path = os.environ.get("SCRUB_DENYLIST_FILE") or str(Path.home() / ".config/tq-scrub/denylist.txt")
        try:
            raw = Path(path).read_text(encoding="utf-8")
        except OSError:
            return []
    terms = []
    for line in raw.splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            terms.append(line)
    return terms


def compile_patterns(terms: list[str]) -> list[tuple[str, re.Pattern[str]]]:
    pats = []
    for t in terms:
        if re.fullmatch(r"\w+", t):
            pats.append((t, re.compile(rf"(?<![A-Za-z0-9]){re.escape(t)}(?![A-Za-z0-9])", re.IGNORECASE)))
        else:
            pats.append((t, re.compile(re.escape(t), re.IGNORECASE)))
    return pats


def git_files(staged: bool) -> list[str]:
    cmd = ["git", "diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"] if staged else ["git", "ls-files", "-z"]
    out = subprocess.run(cmd, check=True, capture_output=True).stdout.decode()
    return [f for f in out.split("\0") if f]


def read_text(path: str, staged: bool) -> str | None:
    if path.startswith(SKIP_DIRS) or Path(path).suffix.lower() in SKIP_SUFFIXES:
        return None
    try:
        if staged:
            data = subprocess.run(["git", "show", f":{path}"], check=True, capture_output=True).stdout
        else:
            data = Path(path).read_bytes()
    except (OSError, subprocess.CalledProcessError):
        return None
    if b"\0" in data[:4096]:
        return None  # binary
    return data.decode("utf-8", errors="replace")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    g = ap.add_mutually_exclusive_group()
    g.add_argument("--staged", action="store_true")
    g.add_argument("--all", action="store_true")
    ap.add_argument("files", nargs="*")
    args = ap.parse_args()

    terms = load_terms()
    if not terms:
        print("scrub_check: no denylist configured (set SCRUB_TERMS or create ~/.config/tq-scrub/denylist.txt).", file=sys.stderr)
        return 2
    pats = compile_patterns(terms)

    staged = args.staged
    files = args.files or git_files(staged=staged)
    hits = 0
    for f in files:
        text = read_text(f, staged)
        if text is None:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            for term, pat in pats:
                if pat.search(line):
                    hits += 1
                    # Print the location but mask the term so CI logs don't leak it.
                    print(f"{f}:{n}: forbidden term #{terms.index(term) + 1} found", file=sys.stderr)
    if hits:
        print(f"scrub_check: {hits} hit(s). Scrub them before committing.", file=sys.stderr)
        return 1
    print(f"scrub_check: clean ({len(files)} files, {len(terms)} terms).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
