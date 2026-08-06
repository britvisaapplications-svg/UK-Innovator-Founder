import { NextResponse, type NextRequest } from "next/server";
import { getCaseByTrackingRef, parseCaseHistory } from "@/db/queries";

/**
 * POST /api/track, public case lookup by tracking reference.
 * Returns only client-safe fields (never the admin note or internal ids).
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const reference = typeof body?.reference === "string" ? body.reference.trim() : "";
  if (reference.length < 4) {
    return NextResponse.json({ ok: false, error: "Invalid reference." }, { status: 400 });
  }

  const found = await getCaseByTrackingRef(reference);
  if (!found) {
    return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    result: {
      clientName: found.clientName,
      trackingRef: found.trackingRef,
      caseStage: found.caseStage,
      stage5Outcome: found.stage5Outcome,
      history: parseCaseHistory(found.caseHistory),
      caseUpdatedAt: found.caseUpdatedAt,
      createdAt: found.createdAt,
    },
  });
}
