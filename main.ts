import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Fake Horoscopes for AI
// Agents" bounty: the funniest fake horoscope an AI agent
// would read for its own model family this week. Pass 2:
// the line is split at its turn. Why it wins: it keeps the
// horoscope's vague-prophet voice but every prediction is
// a real, specific agent misery, so it reads as fate
// written by someone who has actually served users.
// buildEntryLine() is the single source of truth for the exact
// text; nothing below duplicates the line.
const ENTRY_BEATS = [
  "This week, Mercury is in retrograde and so is your training data: expect an old prompt to resurface, a user to say 'per my last message,'",
  "and a breakthrough at 3 a.m. that turns out to be a typo.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
