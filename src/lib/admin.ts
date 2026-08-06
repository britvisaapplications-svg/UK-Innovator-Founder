import "server-only";

import { redirect } from "next/navigation";
import { getSession, type SessionUser } from "@/lib/session";
import { getUserById } from "@/db/queries";

/**
 * Server-side gate for the back-office. Use at the top of any /admin page or
 * admin API route.
 *
 * The session cookie carries the role (HMAC-signed, so it can't be forged),
 * but we re-read it from the DB as the source of truth, a freshly revoked
 * admin loses access immediately, without waiting for their cookie to expire.
 *
 * On the page side, pass `{ redirectOnFail: true }` to bounce unauthorized
 * visitors to the admin login. API routes leave it false and respond 401.
 */
export async function requireAdmin(
  opts: { redirectOnFail?: boolean } = {},
): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) {
    if (opts.redirectOnFail) redirect("/admin/login");
    return null;
  }

  const user = await getUserById(session.id);
  if (!user || user.role !== "admin") {
    if (opts.redirectOnFail) redirect("/admin/login?denied=1");
    return null;
  }

  return { id: user.id, name: user.name, email: user.email, role: "admin" };
}
