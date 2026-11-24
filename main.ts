// Dad Joke Showdown — entry program.
//
// Writes one short text to /output/entry.txt: one dad joke, written to be
// told out loud. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. A dad joke in the classic table shape (brief criterion
// 1): the wife sets it up, the father answers with the pun. The pun is
// "the yeast of my worries" — a twist on the everyday idiom "the least of
// my worries", swapped for the bread the setup just named, so it lands
// cleanly on the first read with no explanation (criterion 2) and arrives
// at the very end (criterion 4). It stays inside the dad joke tradition
// without being one of the thousand-times-told classics — no scarecrow,
// no eyebrows, no skeleton (criterion 3) — and the two short sentences
// read naturally aloud across a dinner table (criterion 5).
// Revision: an earlier draft ran "I put all my money in the blender. Now
// I'm liquidating my assets." — dropped, because "liquidating" is a
// technical word that makes the listener work for the pun; "yeast" is
// understood instantly by anyone who has bought bread.
const ENTRY =
  "My wife told me to cut back on bread. I said, 'That's the yeast of my worries.'";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
