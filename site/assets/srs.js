/* Spaced repetition for the daily practice page (Leitner boxes).
   Box 0 = new. Good moves a card up one box, Easy up two, Hard keeps it, Again sends it back to box 1.
   A card in box b is due INTERVALS[b] days after its last review. */
import { fetchJSON, fetchText, store, today, addDays } from "./app.js";

export const INTERVALS = [0, 1, 3, 7, 16, 35];
export const NEW_PER_DAY = 5;
export const MAX_PER_DAY = 25;

export async function loadCards(manifest) {
  const cards = [];
  for (const path of manifest.decks || []) {
    const deck = await fetchJSON(path, { cards: [] });
    for (const c of deck.cards || []) cards.push({ ...c, deck: deck.deck || path });
  }
  // Glossary rows marked ✔ with a definition become cards too.
  try {
    const g = await fetchText("kb/glossary.md");
    for (const line of g.split(/\r?\n/)) {
      const cells = line.split("|").map(s => s.trim());
      if (cells.length < 6 || cells[1] === "Term" || /^-+$/.test(cells[1])) continue;
      const [, term, lane, def, ok] = cells;
      if (def && /✔|✓|x|yes/i.test(ok)) cards.push({ id: "g-" + term.toLowerCase().replace(/[^a-z0-9]+/g, "-"), lane: lane || "sv", type: "recall", deck: "glossary", front: `Define, in one line: **${term}**`, back: def, note: "glossary", author: "me" });
    }
  } catch {}
  return cards;
}

/** progress = { version, cards: { id: { box, last, due, reps, lapses } }, days: { date: { done, again } } } */
export function loadProgress() { return store.get("progress", { version: 1, cards: {}, days: {} }); }
export function saveProgress(p) { store.set("progress", p); }

/** Merge two progress objects (local + repo), keeping the most recent review per card. */
export function mergeProgress(a, b) {
  const out = { version: 1, cards: { ...(a.cards || {}) }, days: { ...(a.days || {}) } };
  for (const [id, c] of Object.entries(b.cards || {})) if (!out.cards[id] || (c.last || "") > (out.cards[id].last || "")) out.cards[id] = c;
  for (const [d, v] of Object.entries(b.days || {})) { const o = out.days[d]; out.days[d] = o ? { done: Math.max(o.done, v.done), again: Math.max(o.again || 0, v.again || 0) } : v; }
  return out;
}

export function isDue(state, day = today()) { return !state || state.box === 0 || (state.due || "") <= day; }

/** Today's queue: due reviews (oldest first) + up to NEW_PER_DAY new cards, capped. */
export function buildQueue(cards, progress, { filter = () => true, day = today() } = {}) {
  const pool = cards.filter(filter);
  const reviews = pool.filter(c => progress.cards[c.id] && progress.cards[c.id].box > 0 && isDue(progress.cards[c.id], day))
    .sort((x, y) => (progress.cards[x.id].due || "").localeCompare(progress.cards[y.id].due || ""));
  const newToday = Object.values(progress.cards).filter(s => s.firstSeen === day).length;
  const fresh = pool.filter(c => !progress.cards[c.id]).slice(0, Math.max(0, NEW_PER_DAY - newToday));
  return reviews.concat(fresh).slice(0, MAX_PER_DAY);
}

export function grade(progress, id, g, day = today()) {
  const s = progress.cards[id] || { box: 0, reps: 0, lapses: 0, firstSeen: day };
  let box = s.box;
  if (g === "again") { box = 1; s.lapses = (s.lapses || 0) + 1; }
  else if (g === "hard") box = Math.max(1, box);
  else if (g === "good") box = Math.min(5, box + 1);
  else if (g === "easy") box = Math.min(5, box + 2);
  const interval = g === "hard" ? Math.max(1, Math.round(INTERVALS[box] / 2)) : INTERVALS[box];
  progress.cards[id] = { ...s, box, last: day, due: addDays(day, g === "again" ? 1 : interval), reps: (s.reps || 0) + 1 };
  const dd = progress.days[day] || { done: 0, again: 0 };
  dd.done += 1; if (g === "again") dd.again += 1;
  progress.days[day] = dd;
  return progress;
}

export function streak(progress, day = today()) {
  let n = 0, d = progress.days[day] ? day : addDays(day, -1);
  while (progress.days[d] && progress.days[d].done > 0) { n++; d = addDays(d, -1); }
  return n;
}
