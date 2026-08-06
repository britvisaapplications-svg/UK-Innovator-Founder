import "server-only";

import {
  completedLabelFor,
  currentStatusLabel,
  latestUpdateMessage,
  CASE_STAGES,
  type Stage5Outcome,
} from "@/lib/caseStages";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/site";

/**
 * Minimal transactional email via the Resend REST API (no SDK dependency).
 * When RESEND_API_KEY isn't configured the send is skipped silently, so the
 * app works end-to-end in dev without an email provider.
 */

type SendResult = { ok: boolean; skipped?: boolean };

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { ok: true, skipped: true };

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: input.to, subject: input.subject, html: input.html }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("Email send failed:", err);
    return { ok: false };
  }
}

/** Progress-update email sent when an admin moves a case to a new stage. */
export function caseProgressEmail(input: {
  clientName: string;
  trackingRef: string;
  caseStage: number;
  stage5Outcome?: Stage5Outcome | null;
}): { subject: string; html: string } {
  const { clientName, trackingRef, caseStage, stage5Outcome } = input;
  const status = currentStatusLabel(caseStage, stage5Outcome);
  const message = latestUpdateMessage(caseStage, stage5Outcome);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const latestDone =
    caseStage > 0 ? completedLabelFor(caseStage - 1, stage5Outcome) : null;

  const rows = CASE_STAGES.map((s, i) => {
    const done = i < caseStage;
    return `<tr>
      <td style="padding:6px 10px;font-size:13px;color:#5b626d;white-space:nowrap;">${s.code}</td>
      <td style="padding:6px 10px;font-size:13px;font-weight:${done ? 700 : 400};color:${done ? "#1a1d22" : "#8a919c"};">
        ${done ? completedLabelFor(i, stage5Outcome) : s.title}
      </td>
      <td style="padding:6px 10px;font-size:13px;color:${done ? "#2e9e5b" : "#8a919c"};white-space:nowrap;">
        ${done ? "✓ Completed" : i === caseStage ? "In progress" : "-"}
      </td>
    </tr>`;
  }).join("");

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f7f9;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;padding:28px;border:1px solid rgba(20,22,28,0.08);">
      <p style="font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#d61f30;margin:0 0 6px;">${SITE_NAME}: Case update</p>
      <h2 style="margin:0 0 14px;color:#15181d;">${status}</h2>
      <p style="color:#1a1d22;line-height:1.6;">Dear ${clientName},</p>
      ${latestDone ? `<p style="color:#1a1d22;line-height:1.6;"><strong>${latestDone}</strong></p>` : ""}
      <p style="color:#1a1d22;line-height:1.6;">${message}</p>
      <p style="margin:20px 0;">
        <span style="display:inline-block;background:#fbeaec;color:#15181d;font-weight:700;padding:8px 14px;border-radius:999px;font-family:monospace;">${trackingRef}</span>
      </p>
      <table style="border-collapse:collapse;width:100%;margin:8px 0 20px;">${rows}</table>
      ${
        siteUrl
          ? `<p><a href="${siteUrl}/case-tracker" style="background:#d61f30;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px;display:inline-block;">Track your case</a></p>`
          : ""
      }
      <p style="color:#5b626d;font-size:13px;line-height:1.6;margin-top:20px;">
        Questions? Reply to this email or contact ${SUPPORT_EMAIL}.
      </p>
    </div>
  </div>`;

  return { subject: `Case ${trackingRef}: ${status}`, html };
}
