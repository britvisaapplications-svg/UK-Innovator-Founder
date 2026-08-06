import { randomBytes } from "node:crypto";

/**
 * Public case tracking numbers, e.g. "IFV-4K7Q-9MX2".
 *
 * 8 chars from a 31-symbol alphabet ≈ 2^39 combinations, hard to guess, easy
 * to read out over the phone (no 0/O or 1/I lookalikes; L stays because the
 * font distinguishes it clearly from 1).
 */
const ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateTrackingRef(): string {
  const bytes = randomBytes(8);
  let s = "";
  for (let i = 0; i < 8; i++) s += ALPHABET[bytes[i] % ALPHABET.length];
  return `IFV-${s.slice(0, 4)}-${s.slice(4)}`;
}
