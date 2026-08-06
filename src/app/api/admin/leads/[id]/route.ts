import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { updateLead } from "@/db/queries";
import { LEAD_STATUSES, type LeadStatus } from "@/db/schema";

/**
 * PATCH /api/admin/leads/:id, update a lead's pipeline status and/or the
 * internal note (never shown to the client).
 */
export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/admin/leads/[id]">,
) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  const patch: { status?: LeadStatus; adminNote?: string } = {};
  if (typeof body.adminNote === "string") patch.adminNote = body.adminNote;
  if (typeof body.status === "string") {
    if (!LEAD_STATUSES.includes(body.status as LeadStatus)) {
      return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
    }
    patch.status = body.status as LeadStatus;
  }
  if (!Object.keys(patch).length) {
    return NextResponse.json({ ok: false, error: "Nothing to update." }, { status: 400 });
  }

  const updated = await updateLead(id, patch);
  if (!updated) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
