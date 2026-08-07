import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { createCase, getLeadById, updateLead } from "@/db/queries";
import { PACKAGE_TIERS, type PackageTier } from "@/db/schema";
import { generateTrackingRef } from "@/lib/trackingRef";
import { caseOpenedEmail, sendEmail } from "@/lib/email";

/**
 * POST /api/admin/cases, open a tracked endorsement case from a lead:
 * { leadId, packageTier? }. The lead is marked "converted", a fresh tracking
 * reference is generated, and the case starts at Stage 1 "Awaiting Initial
 * Information".
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

  if (typeof body.leadId !== "string" || !body.leadId) {
    return NextResponse.json({ ok: false, error: "A leadId is required." }, { status: 400 });
  }

  try {
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

    // Welcome email with the tracking number; never blocks case creation.
    let emailed: boolean | undefined;
    if (process.env.CASE_EMAIL_ON_UPDATE !== "off") {
      const { subject, html } = caseOpenedEmail({
        clientName: created.clientName,
        trackingRef: created.trackingRef,
      });
      const r = await sendEmail({ to: created.email, subject, html });
      emailed = r.ok && !r.skipped;
    }

    return NextResponse.json({ ok: true, id: created.id, trackingRef: created.trackingRef, emailed });
  } catch (err) {
    console.error("Case create failed:", err);
    return NextResponse.json({ ok: false, error: "Could not create case." }, { status: 500 });
  }
}
