/* Verification growth: shared helpers for every page.
   Data comes from files in the repo (copied into the site at build time, listed in manifest.json).
   Writes go back to the repo through the GitHub contents API with a fine-grained token kept in this browser only. */

export const $ = (id) => document.getElementById(id);
export function el(tag, attrs = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === "class") n.className = v;
    else if (k === "style") n.setAttribute("style", v);
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (k === "html") n.innerHTML = v;
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const c of kids.flat(Infinity)) if (c !== null && c !== undefined && c !== false) n.append(c.nodeType ? c : document.createTextNode(String(c)));
  return n;
}
export function sv(tag, attrs = {}) { const n = document.createElementNS("http://www.w3.org/2000/svg", tag); for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; }

export const LANES = {
  sv:    { name: "SV / UVM",     color: "var(--sv)" },
  dpi:   { name: "DPI-C seam",   color: "var(--seam)" },
  cpp:   { name: "C++",          color: "var(--cpp)" },
  auto:  { name: "Automation",   color: "var(--auto)" },
  tools: { name: "Tools & flow", color: "var(--sand)" },
  debug: { name: "Debug",        color: "var(--rose)" },
};

/* ---------- dates ---------- */
export const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
export const addDays = (iso, n) => { const [y, m, d] = iso.split("-").map(Number); const dt = new Date(y, m - 1, d + n); return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`; };
export const daysBetween = (a, b) => Math.round((new Date(b + "T00:00") - new Date(a + "T00:00")) / 864e5);
export function fmtDate(iso, long) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, long ? { day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short" });
}

/* ---------- storage ---------- */
export const store = {
  get(k, def) { try { const v = localStorage.getItem("tqg:" + k); return v === null ? def : JSON.parse(v); } catch { return def; } },
  set(k, v) { try { localStorage.setItem("tqg:" + k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem("tqg:" + k); } catch {} },
};

/* ---------- fetching repo files ---------- */
const cache = {};
export async function fetchText(path) {
  if (cache[path] !== undefined) return cache[path];
  const r = await fetch(path, { cache: "no-cache" });
  if (!r.ok) throw new Error(`${path}: ${r.status}`);
  return (cache[path] = await r.text());
}
export async function fetchJSON(path, fallback) {
  try { return JSON.parse(await fetchText(path)); } catch (e) { if (fallback !== undefined) return fallback; throw e; }
}
export const manifest = () => fetchJSON("manifest.json", { reports: [], daily: [], notes: [], decks: [], built: null });

/* ---------- tiny frontmatter parser (the subset our files use) ---------- */
export function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: text };
  const data = {}; let key = null;
  for (const raw of m[1].split(/\r?\n/)) {
    const line = raw.replace(/\s+#.*$/, "");
    const li = line.match(/^\s+-\s+(.*)$/);
    if (li && key) { (data[key] = Array.isArray(data[key]) ? data[key] : []).push(unq(li[1])); continue; }
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1]; const v = kv[2].trim();
    if (v === "" ) data[key] = [];
    else if (v === "[]") data[key] = [];
    else if (v.startsWith("[") && v.endsWith("]")) data[key] = v.slice(1, -1).split(",").map(s => unq(s.trim())).filter(Boolean);
    else data[key] = unq(v);
  }
  return { data, body: text.slice(m[0].length) };
}
const unq = (s) => s.replace(/^["']|["']$/g, "");

/* ---------- markdown + mermaid ---------- */
let mermaidP = null;
function loadMermaid() {
  if (!mermaidP) mermaidP = new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.min.js";
    s.onload = () => res(window.mermaid); s.onerror = rej; document.head.append(s);
  });
  return mermaidP;
}
export const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;

/** Render markdown into `target`. `base` is the repo-relative folder of the source file (for relative links). */
export async function renderMarkdown(target, md, { base = "", linkNote } = {}) {
  const html = window.marked.parse(md.replace(/\[\[([\w-]+)\]\]/g, (_, s) => `<a class="wiki" data-slug="${s}" href="kb.html#${s}">${s.replace(/-/g, " ")}</a>`), { gfm: true });
  target.innerHTML = html;
  target.classList.add("md");
  // relative links → repo-relative
  target.querySelectorAll("a[href]").forEach(a => {
    const h = a.getAttribute("href");
    if (/^(https?:|#|mailto:|kb\.html)/.test(h)) return;
    const resolved = resolvePath(base, h);
    if (resolved.endsWith(".md") && linkNote) { a.href = "#"; a.addEventListener("click", (e) => { e.preventDefault(); linkNote(resolved); }); }
    else a.setAttribute("href", resolved);
  });
  // mermaid blocks
  const blocks = [...target.querySelectorAll("pre > code.language-mermaid")];
  if (blocks.length) {
    const divs = blocks.map(code => { const d = el("div", { class: "mermaid" }); d.textContent = code.textContent; code.parentElement.replaceWith(d); return d; });
    try {
      const mermaid = await loadMermaid();
      mermaid.initialize({ startOnLoad: false, theme: isDark() ? "dark" : "neutral", securityLevel: "strict", fontFamily: "ui-sans-serif, system-ui" });
      await mermaid.run({ nodes: divs, suppressErrors: true });
    } catch { divs.forEach(d => d.prepend(el("p", { class: "sub" }, "Diagram library didn't load (offline?). Source shown:"))); }
  }
}
export function resolvePath(base, rel) {
  const parts = (base ? base.split("/") : []).concat(rel.split("/"));
  const out = [];
  for (const p of parts) { if (p === "..") out.pop(); else if (p && p !== ".") out.push(p); }
  return out.join("/");
}

/* ---------- GitHub write-back ---------- */
export function repoInfo() {
  const saved = store.get("repo", null);
  if (saved) return saved;
  const m = location.hostname.match(/^([\w-]+)\.github\.io$/);
  if (m) return { owner: m[1], repo: location.pathname.split("/").filter(Boolean)[0] || `${m[1]}.github.io`, branch: "main" };
  return { owner: "AnnieCtq", repo: "tq_growth_dashboard", branch: "main" };
}
export const token = () => store.get("token", "");
export const canWrite = () => !!token();
const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const unb64 = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/\n/g, "")), c => c.charCodeAt(0)));
async function gh(path, opts = {}) {
  const { owner, repo } = repoInfo();
  const r = await fetch(`https://api.github.com/repos/${owner}/${repo}${path ? "/" + path : ""}`, {
    ...opts, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token()}`, "X-GitHub-Api-Version": "2022-11-28", ...(opts.headers || {}) },
  });
  if (!r.ok && r.status !== 404) throw new Error(`GitHub ${r.status}: ${(await r.text()).slice(0, 160)}`);
  return r.status === 404 ? null : r.json();
}
/** Read a file straight from the repo (fresh, not the Pages copy). */
export async function ghRead(path) {
  const { branch } = repoInfo();
  const j = await gh(`contents/${path}?ref=${branch}`);
  return j ? { text: unb64(j.content), sha: j.sha } : null;
}
/** Create or update a file in the repo, one commit. */
export async function ghWrite(path, text, message) {
  const { branch } = repoInfo();
  const cur = await gh(`contents/${path}?ref=${branch}`);
  return gh(`contents/${path}`, { method: "PUT", body: JSON.stringify({ message, content: b64(text), branch, ...(cur ? { sha: cur.sha } : {}) }) });
}
export function download(name, text) {
  const a = el("a", { href: URL.createObjectURL(new Blob([text], { type: "application/json" })), download: name });
  document.body.append(a); a.click(); a.remove();
}

/* ---------- UI chrome ---------- */
export function toast(msg, ms = 2600) {
  const t = el("div", { class: "toast fade-in", role: "status" }, msg);
  document.body.append(t); setTimeout(() => t.remove(), ms);
}
function applyTheme(t) { if (t) document.documentElement.setAttribute("data-theme", t); else document.documentElement.removeAttribute("data-theme"); }
applyTheme(store.get("theme", null));

const PAGES = [["index.html", "Growth"], ["daily.html", "Daily log"], ["kb.html", "Knowledge"], ["practice.html", "Practice"]];
export function chrome(current) {
  const due = store.get("dueToday", null);
  const nav = el("nav", { class: "top", "aria-label": "Main" }, el("div", { class: "in" },
    el("a", { class: "brand", href: "index.html" }, el("span", { class: "leaf", "aria-hidden": "true" }), "Verification growth"),
    PAGES.map(([href, name]) => el("a", { class: "tab", href, "aria-current": href === current ? "page" : null },
      name, href === "practice.html" && due && due.date === today() && due.n > 0 ? el("span", { class: "badge", "aria-label": `${due.n} cards due` }, due.n) : null)),
    el("span", { class: "sp" }),
    el("button", { class: "btn quiet", title: "Toggle theme", "aria-label": "Toggle light or dark theme", onclick: () => {
      const next = isDark() ? "light" : "dark"; applyTheme(next); store.set("theme", next); document.dispatchEvent(new Event("themechange"));
    } }, "◐"),
    el("button", { class: "btn quiet", onclick: openSettings, title: "Repo and token" }, canWrite() ? "● Connected" : "Connect")));
  document.body.prepend(nav);
}

export function openSettings() {
  let d = document.getElementById("settingsDlg");
  if (!d) {
    const ri = repoInfo();
    d = el("dialog", { id: "settingsDlg" },
      el("h2", {}, "Save to GitHub"),
      el("p", { class: "sub" }, "The site reads from the repo. To save daily logs, self-ratings and practice progress back to it, paste a fine-grained token limited to this one repository, with Contents: read and write. It stays in this browser only."),
      el("div", { class: "grid2", style: "margin-top:14px;gap:10px" },
        el("div", {}, el("label", { class: "f", for: "sOwner" }, "Owner"), el("input", { type: "text", id: "sOwner", value: ri.owner })),
        el("div", {}, el("label", { class: "f", for: "sRepo" }, "Repository"), el("input", { type: "text", id: "sRepo", value: ri.repo }))),
      el("div", { style: "margin-top:10px" }, el("label", { class: "f", for: "sTok" }, "Fine-grained token"), el("input", { type: "password", id: "sTok", value: token(), autocomplete: "off", placeholder: "github_pat_…" })),
      el("p", { class: "sub" }, el("a", { href: "https://github.com/settings/personal-access-tokens/new", target: "_blank", rel: "noopener" }, "Create a token"), " → Only select repositories → this repo → Repository permissions → Contents: Read and write."),
      el("p", { class: "status", id: "sStatus" }),
      el("div", { class: "row", style: "justify-content:flex-end;margin-top:8px" },
        el("button", { class: "btn quiet", onclick: () => { store.del("token"); d.close(); location.reload(); } }, "Forget token"),
        el("button", { class: "btn", onclick: () => d.close() }, "Cancel"),
        el("button", { class: "btn primary", onclick: async () => {
          store.set("repo", { owner: $("sOwner").value.trim(), repo: $("sRepo").value.trim(), branch: "main" });
          store.set("token", $("sTok").value.trim());
          $("sStatus").textContent = "Checking…"; $("sStatus").className = "status";
          try { const r = await gh(""); if (!r) throw new Error("repository not found"); if (r.permissions && !r.permissions.push) throw new Error("token can read but not write"); d.close(); location.reload(); }
          catch (e) { $("sStatus").textContent = e.message; $("sStatus").className = "status bad"; }
        } }, "Save")));
    document.body.append(d);
  }
  d.showModal();
}
