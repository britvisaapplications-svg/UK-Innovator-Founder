import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

/**
 * Node-safe Drizzle client backed by Turso (libSQL).
 *
 * Used by both the Next.js runtime and standalone db:* scripts. App code
 * should import from `./index` (which adds a server-only guard); scripts
 * import here directly after loading `./env`.
 */
const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error(
    "TURSO_DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.",
  );
}

export const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });

export { schema };
