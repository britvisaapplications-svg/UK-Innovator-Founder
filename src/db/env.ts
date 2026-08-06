/**
 * Loads `.env.local` (then `.env`) for standalone scripts run outside Next.js
 *, e.g. drizzle-kit and the db:* scripts. Next.js loads these itself at
 * runtime, so app code never imports this file.
 *
 * Import this FIRST (before importing `./client`) so process.env is populated
 * before the db client reads it.
 */
import { config } from "dotenv";

config({ path: ".env.local" });
config(); // fall back to .env if present, without overriding .env.local
