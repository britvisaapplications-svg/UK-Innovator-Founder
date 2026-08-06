import "./env";
import { eq } from "drizzle-orm";
import { db } from "./client";
import { users } from "./schema";
import { hashPassword } from "@/lib/password";

/**
 * Create (or promote) a back-office admin:
 *   npm run db:make-admin -- <email> <password> [name]
 *
 * If the email already exists it is promoted to admin (and the password is
 * updated when one is supplied).
 */
async function main() {
  const [email, password, name] = process.argv.slice(2);
  if (!email) {
    console.error("Usage: npm run db:make-admin -- <email> <password> [name]");
    process.exit(1);
  }

  const normalized = email.trim().toLowerCase();
  const existing = await db.query.users.findFirst({ where: eq(users.email, normalized) });

  if (existing) {
    await db
      .update(users)
      .set({
        role: "admin",
        ...(password ? { passwordHash: hashPassword(password) } : {}),
      })
      .where(eq(users.id, existing.id));
    console.log(`Promoted ${normalized} to admin${password ? " (password updated)" : ""}.`);
    return;
  }

  if (!password) {
    console.error("New user: a password is required.");
    process.exit(1);
  }

  await db.insert(users).values({
    id: crypto.randomUUID(),
    name: name || "Admin",
    email: normalized,
    passwordHash: hashPassword(password),
    role: "admin",
  });
  console.log(`Created admin ${normalized}.`);
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error("make-admin failed:", err.message ?? err);
    process.exit(1);
  },
);
