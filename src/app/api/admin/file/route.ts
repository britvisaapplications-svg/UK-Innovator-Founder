import { NextResponse, type NextRequest } from "next/server";
import { get } from "@vercel/blob";
import { requireAdmin } from "@/lib/admin";

/**
 * Admin-only proxy for private CV blobs.
 *
 * CVs are uploaded with access:"private", so they have no publicly reachable
 * URL. This route re-checks the admin role (against the DB, so a revoked
 * admin loses access immediately) and streams the blob bytes back using the
 * store's read-write token. The file URL never leaves the server in a form a
 * visitor could replay.
 *
 * Usage: /api/admin/file?url=<encoded blob url>
 */
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ ok: false, error: "Missing file." }, { status: 400 });
  }
  // Only serve blobs from our own store, never arbitrary URLs.
  if (!/^https:\/\/[a-z0-9.-]+\.blob\.vercel-storage\.com\//i.test(url)) {
    return NextResponse.json({ ok: false, error: "Invalid file." }, { status: 400 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ ok: false, error: "Storage not configured." }, { status: 503 });
  }

  try {
    const result = await get(url, {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    if (!result || result.statusCode !== 200) {
      return NextResponse.json({ ok: false, error: "File not found." }, { status: 404 });
    }
    return new NextResponse(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType || "application/octet-stream",
        "Content-Length": String(result.blob.size),
        "Content-Disposition": "inline",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (err) {
    console.error("Admin file proxy failed:", err);
    return NextResponse.json({ ok: false, error: "Could not load file." }, { status: 500 });
  }
}
