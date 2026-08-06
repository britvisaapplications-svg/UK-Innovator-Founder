import { NextResponse, type NextRequest } from "next/server";
import { getUserByEmail } from "@/db/queries";
import { verifyPassword } from "@/lib/password";
import { createSession } from "@/lib/session";

/** POST /api/admin/login, email + password → HMAC-signed session cookie. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 400 });
  }

  const user = await getUserByEmail(email);
  // Same error either way, don't reveal which accounts exist.
  if (!user || user.role !== "admin" || !verifyPassword(password, user.passwordHash)) {
    return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
  }

  await createSession({ id: user.id, name: user.name, email: user.email, role: "admin" });
  return NextResponse.json({ ok: true });
}
