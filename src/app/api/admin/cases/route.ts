import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createCase, getLeadById, updateLead } from "@/db/queries";
import { PACKAGE_TIERS, type PackageTier } from "@/db/schema";
import { generateTrackingRef } from "@/lib/trackingRef";

/**
 * POST /api/admin/cases, open a tracked endorsement case.
 *
 * Either converts an existing lead ({ leadId, packageTier? }), the lead is
 * marked "converted", or creates a case manually ({ clientName, email,
 * phone?, packageTier? }). A fresh tracking reference is generated either way
 * and the case starts at Stage 1 "Awaiting Initial Information".
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body." }, { status: 400 });
  }

  let packageTier: PackageTier | null = null;
  if (typeof body.packageTier === "string" && body.packageTier) {
    if (!PACKAGE_TIERS.includes(body.packageTier as PackageTier)) {
      return NextResponse.json({ ok: false, error: "Invalid package." }, { status: 400 });
    }
    packageTier = body.packageTier as PackageTier;
  }

  try {
    if (typeof body.leadId === "string" && body.leadId) {
      const lead = await getLeadById(body.leadId);
      if (!lead) {
        return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
      }
      const created = await createCase({
        leadId: lead.id,
        trackingRef: generateTrackingRef(),
        clientName: lead.fullName || lead.email,
        email: lead.email,
        phone: lead.phone,
        packageTier,
      });
      await updateLead(lead.id, { status: "converted" });
      return NextResponse.json({ ok: true, id: created.id, trackingRef: created.trackingRef });
    }

    const clientName = typeof body.clientName === "string" ? body.clientName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!clientName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Client name and a valid email are required." },
        { status: 400 },
      );
    }
    const created = await createCase({
      trackingRef: generateTrackingRef(),
      clientName,
      email,
      phone: typeof body.phone === "string" ? body.phone.trim() || null : null,
      packageTier,
    });
    return NextResponse.json({ ok: true, id: created.id, trackingRef: created.trackingRef });
  } catch (err) {
    console.error("Case create failed:", err);
    return NextResponse.json({ ok: false, error: "Could not create case." }, { status: 500 });
  }
}
