import "server-only";

import {
  completedLabelFor,
  currentStatusLabel,
  latestUpdateMessage,
  CASE_STAGES,
  type Stage5Outcome,
} from "@/lib/caseStages";
import { IAA_NOTE, SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

/**
 * Minimal transactional email via the Resend REST API (no SDK dependency).
 * When RESEND_API_KEY isn't configured the send is skipped silently, so the
 * app works end-to-end in dev without an email provider.
 *
 * Testing override: while EMAIL_OVERRIDE_TO is set, EVERY outgoing email is
 * redirected to that address instead of the real recipient, with the
 * original recipient noted in the subject. Remove the variable at launch.
 */

type SendResult = { ok: boolean; skipped?: boolean };

export type EmailAttachment = {
  filename: string;
  /** Base64-encoded file content. */
  content: string;
};

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  attachments?: EmailAttachment[];
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return { ok: true, skipped: true };

  const override = process.env.EMAIL_OVERRIDE_TO?.trim();
  const to = override || input.to;
  const subject = override ? `[TEST for ${input.to}] ${input.subject}` : input.subject;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html: input.html,
        ...(input.attachments?.length ? { attachments: input.attachments } : {}),
      }),
    });
    if (!res.ok) console.error("Email send rejected:", res.status, await res.text());
    return { ok: res.ok };
  } catch (err) {
    console.error("Email send failed:", err);
    return { ok: false };
  }
}

/* ------------------------------------------------------------ shared layout */

/**
 * Brand email shell shared by every message: ink header with the wordmark,
 * white card body, quiet regulatory footer. Table-based and fully inlined so
 * it renders cleanly in Gmail, Outlook and Apple Mail; no external images.
 */
function emailShell(body: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background-color:#f6f7f9;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f7f9;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">

        <!-- Header -->
        <tr><td style="background-color:#15181d;border-radius:16px 16px 0 0;padding:22px 32px;">
          <span style="font-family:Arial,Helvetica,sans-serif;font-size:19px;font-weight:bold;color:#ffffff;letter-spacing:-0.2px;">
            UK Innovator <span style="color:#d61f30;">Founder</span>
          </span>
        </td></tr>

        <!-- Body card -->
        <tr><td style="background-color:#ffffff;padding:32px;border:1px solid #e6e8eb;border-top:none;">
          ${body}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background-color:#15181d;border-radius:0 0 16px 16px;padding:22px 32px;">
          <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.6;color:#9aa1ab;">
            ${IAA_NOTE}
          </p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.6;color:#9aa1ab;">
            <a href="mailto:${SUPPORT_EMAIL}" style="color:#c7ccd3;text-decoration:none;">${SUPPORT_EMAIL}</a>
            &nbsp;&middot;&nbsp; ${SUPPORT_PHONE}
            ${siteUrl ? `&nbsp;&middot;&nbsp; <a href="${siteUrl}" style="color:#c7ccd3;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a>` : ""}
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const P = `margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#333a42;`;
const H2 = `margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.25;color:#15181d;`;
const EYEBROW = `margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#d61f30;`;

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 20px;"><tr>
    <td style="background-color:#d61f30;border-radius:999px;">
      <a href="${href}" style="display:inline-block;padding:13px 30px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${label}</a>
    </td>
  </tr></table>`;
}

/* -------------------------------------------------- lead (CV form) emails */

export type LeadEmailInput = {
  fullName: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  hasIdea: string | null;
  investmentBudget: string | null;
  cvFileName: string | null;
};

/** Confirmation to the applicant after the Free CV & Profile Check form. */
export function leadConfirmationEmail(lead: LeadEmailInput): { subject: string; html: string } {
  const firstName = (lead.fullName || "").trim().split(/\s+/)[0] || "there";
  const needsIdeas = lead.hasIdea === "no";

  const steps: [string, string][] = [
    [
      "We review your CV",
      "One of our advisers reads your CV and profile against the Innovator Founder criteria: new, innovative, viable and scalable.",
    ],
    [
      "We prepare your free assessment",
      needsIdeas
        ? "Because you told us you don't have a business idea yet, we also look at where your experience could support up to 2-3 credible business ideas."
        : "We consider how your existing business idea could be developed into a proposition an Endorsing Body can assess.",
    ],
    [
      "We contact you",
      `You will usually hear from us within 1-2 working days${lead.phone ? ", by WhatsApp or email," : " by email"} to talk through your options. There is no charge and no obligation at this stage.`,
    ],
  ];

  const stepsHtml = steps
    .map(
      ([title, desc], i) => `
      <tr>
        <td valign="top" style="padding:0 14px 18px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td align="center" style="width:30px;height:30px;background-color:#fbeaec;border-radius:50%;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:#d61f30;">${i + 1}</td>
          </tr></table>
        </td>
        <td valign="top" style="padding:0 0 18px;">
          <p style="margin:0 0 3px;font-family:Arial,Helvetica,sans-serif;font-size:14.5px;font-weight:bold;color:#15181d;">${title}</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.6;color:#5b626d;">${desc}</p>
        </td>
      </tr>`,
    )
    .join("");

  const html = emailShell(`
    <p style="${EYEBROW}">Free CV &amp; profile check</p>
    <h2 style="${H2}">Thank you, ${firstName}. Your CV is with our team.</h2>
    <p style="${P}">We have received your details${lead.cvFileName ? " and your CV" : ""}, and your free initial assessment is underway. Here is what happens next:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px;">${stepsHtml}</table>
    <p style="${P}">In the meantime, if anything changes or you would like to add information to your enquiry, simply reply to this email.</p>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#333a42;">Kind regards,</p>
    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#15181d;">The ${SITE_NAME} team</p>
  `);

  return { subject: `We've received your CV, ${firstName}. Here's what happens next`, html };
}

/** Internal notification to the admin: full form details, CV attached. */
export function leadAdminEmail(lead: LeadEmailInput): { subject: string; html: string } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const row = (label: string, value: string, strong = false) => `
    <tr>
      <td style="padding:9px 14px;border-bottom:1px solid #eef0f2;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.5px;text-transform:uppercase;color:#8a919c;white-space:nowrap;">${label}</td>
      <td style="padding:9px 14px;border-bottom:1px solid #eef0f2;font-family:Arial,Helvetica,sans-serif;font-size:14px;${strong ? "font-weight:bold;" : ""}color:#15181d;">${value}</td>
    </tr>`;

  const html = emailShell(`
    <p style="${EYEBROW}">New enquiry</p>
    <h2 style="${H2}">New CV lead: ${lead.fullName || lead.email}</h2>
    <p style="${P}">A new Free CV &amp; Profile Check was submitted on the website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f2;border-radius:10px;margin:0 0 20px;">
      ${row("Name", lead.fullName || "(not given)", true)}
      ${row("Email", `<a href="mailto:${lead.email}" style="color:#d61f30;">${lead.email}</a>`)}
      ${row("WhatsApp / Phone", lead.phone || "(not given)")}
      ${row("Country", lead.country || "(not given)")}
      ${row("Business idea", lead.hasIdea === "yes" ? "Has an idea" : lead.hasIdea === "no" ? "Needs idea suggestions" : "(not answered)")}
      ${row("Investment budget", lead.investmentBudget || "(not given)")}
      ${row("CV", lead.cvFileName ? `Attached: ${lead.cvFileName}` : "Not uploaded")}
    </table>
    ${siteUrl ? ctaButton(`${siteUrl}/admin`, "Open the back office") : ""}
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;line-height:1.6;color:#8a919c;">The lead is saved in the back office. This email contains personal data; handle it in line with the privacy policy.</p>
  `);

  return {
    subject: `New CV lead: ${lead.fullName || lead.email}${lead.country ? ` (${lead.country})` : ""}`,
    html,
  };
}

/* ------------------------------------------------------------- case emails */

/**
 * Welcome email when a case is opened: gives the client their tracking
 * number, the tracker link and the 7-stage journey ahead.
 */
export function caseOpenedEmail(input: {
  clientName: string;
  trackingRef: string;
}): { subject: string; html: string } {
  const { clientName, trackingRef } = input;
  const firstName = clientName.trim().split(/\s+/)[0] || "there";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const stagesHtml = CASE_STAGES.map(
    (s, i) => `
    <tr>
      <td style="padding:7px 12px;border-bottom:1px solid #eef0f2;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;color:#8a919c;white-space:nowrap;">${s.code}</td>
      <td style="padding:7px 12px;border-bottom:1px solid #eef0f2;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;color:${i === 0 ? "#d61f30" : "#333a42"};${i === 0 ? "font-weight:bold;" : ""}">
        ${s.title}${i === 0 ? " &nbsp;&larr; you are here" : ""}
      </td>
    </tr>`,
  ).join("");

  const html = emailShell(`
    <p style="${EYEBROW}">Your endorsement case is open</p>
    <h2 style="${H2}">Welcome, ${firstName}. Your journey has started.</h2>
    <p style="${P}">We have opened your Innovator Founder endorsement case. This is your personal case tracking number, keep it safe:</p>
    <p style="margin:0 0 20px;">
      <span style="display:inline-block;background-color:#fbeaec;color:#15181d;font-weight:bold;padding:10px 18px;border-radius:999px;font-family:'Courier New',monospace;font-size:17px;letter-spacing:1px;">${trackingRef}</span>
    </p>
    <p style="${P}">You can check exactly where your case is, at any time, on our Case Tracker:</p>
    ${siteUrl ? ctaButton(`${siteUrl}/case-tracker`, "Track your case") : ""}
    <p style="${P}">Your case moves through these seven stages, and we will email you each time a stage completes:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f2;border-radius:10px;margin:0 0 20px;">${stagesHtml}</table>
    <p style="${P}">First up: we are reviewing your CV, qualification details and any business idea or market research you have provided. If you have anything to add, simply reply to this email.</p>
    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#333a42;">Kind regards,</p>
    <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#15181d;">The ${SITE_NAME} team</p>
  `);

  return { subject: `Your case is open, ${firstName}. Tracking number: ${trackingRef}`, html };
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
