import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { setCaseNote, setCaseStage } from "@/db/queries";
import { STAGE5_INDEX, TOTAL_STAGES, type Stage5Outcome } from "@/lib/caseStages";
import { caseProgressEmail, sendEmail } from "@/lib/email";

/**
 * PATCH /api/admin/cases/:id, update one case.
 *   { caseStage, stage5Outcome? }  set how many stages are complete (0..7).
 *                                  Completing Stage 5 requires an outcome
 *                                  ("pass" | "fail") the first time.
 *   { adminNote }                  internal-only note (never shown to client).
 *
 * When the stage changes and an email provider is configured, the client is
 * notified automatically. Set CASE_EMAIL_ON_UPDATE="off" to disable.
 */
export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<"/api/admin/cases/[id]">,
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

  if (typeof body.adminNote === "string") {
    const updated = await setCaseNote(id, body.adminNote);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    if (body.caseStage == null) return NextResponse.json({ ok: true });
  }

  if (body.caseStage != null) {
    const next = Number(body.caseStage);
    if (!Number.isInteger(next) || next < 0 || next > TOTAL_STAGES) {
      return NextResponse.json({ ok: false, error: "Invalid stage." }, { status: 400 });
    }

    let outcome: Stage5Outcome | null | undefined = undefined;
    if (body.stage5Outcome === "pass" || body.stage5Outcome === "fail") {
      outcome = body.stage5Outcome;
    }
    const updated = await setCaseStage(id, next, outcome);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Not found." }, { status: 404 });
    }
    if (next >= STAGE5_INDEX + 1 && !updated.stage5Outcome) {
      // Roll back: Stage 5 can't complete without a pass/fail outcome.
      await setCaseStage(id, STAGE5_INDEX, null);
      return NextResponse.json(
        { ok: false, error: "Stage 5 needs an outcome: passed or unsuccessful." },
        { status: 400 },
      );
    }

    let emailed: boolean | undefined;
    const notify = process.env.CASE_EMAIL_ON_UPDATE !== "off";
    if (notify && updated.email) {
      const { subject, html } = caseProgressEmail({
        clientName: updated.clientName,
        trackingRef: updated.trackingRef,
        caseStage: updated.caseStage,
        stage5Outcome: updated.stage5Outcome as Stage5Outcome | null,
      });
      const r = await sendEmail({ to: updated.email, subject, html });
      emailed = r.ok && !r.skipped;
    }
    return NextResponse.json({
      ok: true,
      caseStage: updated.caseStage,
      stage5Outcome: updated.stage5Outcome,
      emailed,
    });
  }

  return NextResponse.json({ ok: true });
}
