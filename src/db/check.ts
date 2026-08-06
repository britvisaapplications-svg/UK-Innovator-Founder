import "./env";
import { client } from "./client";

/**
 * Connectivity smoke test: `npm run db:check`.
 * Prints the tables Turso currently has, so you can verify credentials and
 * migration state at a glance.
 */
async function main() {
  const res = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
  );
  console.log("Connected to Turso ✔");
  console.log(
    "Tables:",
    res.rows.length ? res.rows.map((r) => r.name).join(", ") : "(none yet, run db:migrate)",
  );
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error("DB check failed:", err.message ?? err);
    process.exit(1);
  },
);
