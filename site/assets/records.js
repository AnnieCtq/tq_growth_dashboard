/* Parsers for the four record files the coaches maintain (records/*.md). */

export const COACHES = {
  dedv: { title: "DE + DV", color: "var(--sv)", scope: "SystemVerilog, UVM, coverage, reading RTL and specs" },
  dpic: { title: "DPI-C + C++", color: "var(--cpp)", scope: "C++ reference models, the DPI-C boundary, build and link" },
  auto: { title: "Automation", color: "var(--auto)", scope: "Python, TCL, Bash, regression flow" },
};
export const AGENTS = [
  { id: "de-dv-coach", group: "dedv", kind: "coach", name: "DE + DV coach" },
  { id: "de-dv-reviewer", group: "dedv", kind: "reviewer", name: "DE + DV reviewer" },
  { id: "dpic-cpp-coach", group: "dpic", kind: "coach", name: "DPI-C + C++ coach" },
  { id: "dpic-cpp-reviewer", group: "dpic", kind: "reviewer", name: "DPI-C + C++ reviewer" },
  { id: "automation-coach", group: "auto", kind: "coach", name: "Automation coach" },
  { id: "automation-reviewer", group: "auto", kind: "reviewer", name: "Automation reviewer" },
];

export function gapOwner(tag) {
  if (/automation|python|tcl|bash|regression/i.test(tag)) return "auto";
  if (/dpi|c\+\+|cpp/i.test(tag) && !/seam-sv/i.test(tag)) return "dpic";
  return "dedv";
}

export function parseGaps(text) {
  const out = { date: null, items: [] };
  if (!text) return out;
  const d = text.match(/Last updated:\**\s*(\d{4}-\d{2}-\d{2})/); if (d) out.date = d[1];
  let status = null;
  for (const line of text.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.*)/);
    if (h) {
      const t = h[1].toLowerCase();
      status = t.includes("recurring") ? "recurring" : t.includes("new") ? "new" : t.includes("closing") ? "closing" : t.includes("open") ? "open" : null;
      continue;
    }
    const m = line.match(/^\s*-\s+(?:\[([^\]]+)\]\s*)?(.+)/);
    if (m && status) {
      const recur = (m[2].match(/(?:recurring\s*)?x(\d+)/i) || [])[1];
      out.items.push({ status, tag: m[1] || "", text: m[2].trim(), owner: gapOwner(m[1] || m[2]), recur: recur ? +recur : 0 });
    }
  }
  return out;
}

export function parseHistorian(text) {
  if (!text) return [];
  const chunks = text.split(/\r?\n(?=## )/).filter(c => /^## /.test(c));
  return chunks.map(c => {
    const lines = c.split(/\r?\n/);
    const head = lines[0].replace(/^##\s+/, "");
    const m = head.match(/^(\d{4}-\d{2}-\d{2})\s*[—–-]\s*(.*)$/);
    const date = m ? m[1] : null; const rest = m ? m[2] : head;
    const [agent, title] = rest.includes(":") ? [rest.slice(0, rest.indexOf(":")).trim(), rest.slice(rest.indexOf(":") + 1).trim()] : ["", rest];
    const sections = {}; let cur = null;
    for (const l of lines.slice(1)) {
      const s = l.match(/^\*\*(.+?)\*\*\s*$/);
      if (s) { cur = s[1].toLowerCase(); sections[cur] = []; continue; }
      if (!cur || !l.trim()) continue;
      sections[cur].push(l.replace(/^\s*-\s+/, "").trim());
    }
    return {
      date, agent, title, kind: /review/i.test(agent) ? "review" : "coaching",
      summary: (sections["session summary"] || []).join(" "),
      knowledge: sections["knowledge gained"] || [],
      next: sections["next session tasks"] || [],
      completed: sections["completed"] || [],
      progress: sections["project progress"] || [],
    };
  });
}

export function parseContext(text) {
  if (!text) return { date: null, text: "" };
  const d = text.match(/Date:\**\s*(\d{4}-\d{2}-\d{2})/);
  const body = text.replace(/^#.*$/m, "").replace(/\*\*Date:\*\*.*$/m, "").replace(/<!--[\s\S]*?-->/g, "").trim();
  return { date: d ? d[1] : null, text: body };
}

/** Lane of a knowledge line, guessed from its wording. */
export function laneOf(t) {
  if (/dpi|chandle|svdpi|c\+\+/i.test(t)) return "dpi";
  if (/python|regex|bash|tcl|script|cron|regression|lsf/i.test(t)) return "auto";
  if (/perforce|shelve|changelist|branch|xcelium|vcs|merge/i.test(t)) return "tools";
  if (/debug|root cause|trigger|triage|macro/i.test(t)) return "debug";
  return "sv";
}
