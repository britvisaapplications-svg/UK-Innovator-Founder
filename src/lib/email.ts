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
 * Transactional email via the Resend REST API (no SDK dependency).
 *
 * Configuration is entirely environment-driven, so the app runs end to end
 * before any keys exist: with RESEND_API_KEY or EMAIL_FROM missing the send
 * is skipped and reported as `skipped`, and the caller still succeeds.
 *
 *   RESEND_API_KEY   re_...                       resend.com/api-keys
 *   EMAIL_FROM       "Name <a@3year-ilr.uk>"      verified sending domain
 *   ADMIN_EMAIL      where new leads land
 *   EMAIL_REPLY_TO   where a client's reply goes (defaults to ADMIN_EMAIL)
 *
 * Testing override: while EMAIL_OVERRIDE_TO is set, EVERY outgoing email is
 * redirected to that address instead of the real recipient, with the
 * original recipient noted in the subject. Remove the variable at launch.
 *
 * Every message goes out with a plain-text part as well as HTML. It is not
 * decoration: text-only clients and screen readers use it, and an HTML-only
 * message scores worse with spam filters.
 */

export type SendResult = { ok: boolean; skipped?: boolean; error?: string };

export type EmailAttachment = {
  filename: string;
  /** Base64-encoded file content. */
  content: string;
};

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}): Promise<SendResult> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    // Previously silent, which made a missing key look like a delivery
    // problem. Say so once, clearly, in the server log.
    console.warn("[email] RESEND_API_KEY / EMAIL_FROM not set. Send skipped.");
    return { ok: true, skipped: true };
  }

  const override = process.env.EMAIL_OVERRIDE_TO?.trim();
  const to = override || input.to;
  const subject = override ? `[TEST for ${input.to}] ${input.subject}` : input.subject;
  const replyTo = input.replyTo || process.env.EMAIL_REPLY_TO?.trim() || undefined;

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
        text: input.text,
        ...(replyTo ? { reply_to: replyTo } : {}),
        ...(input.attachments?.length ? { attachments: input.attachments } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] rejected:", res.status, detail);
      return { ok: false, error: `${res.status} ${detail}`.slice(0, 300) };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] failed:", err);
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}

/* ========================================================================= */
/*  Design tokens                                                            */
/* ========================================================================= */

/* The site's palette, carried over exactly. */
const INK = "#15181d";
const CRIMSON = "#d61f30";
const CRIMSON_TINT = "#fbeaec";
const PAPER = "#f6f7f9";
const RULE = "#e6e8eb";
const BODY_TEXT = "#5b626d";
const GREEN = "#2e9e5b";

const SANS = "Arial, 'Helvetica Neue', Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', Times, serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace";

/**
 * Escapes user-supplied text before it goes anywhere near an HTML email.
 *
 * This file previously interpolated names, emails, countries and client
 * names straight into the markup. An apostrophe or an ampersand was enough
 * to corrupt the message, and a name containing a tag would have been
 * injected into the adviser's inbox verbatim. Everything that originates
 * with a person now goes through here.
 */
export function esc(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/*
 * A long unbroken string (a 60-character email address, a one-word message)
 * otherwise forces the 600px frame wider than the viewport. Paired with
 * `table-layout:fixed` on the wrapper, this keeps content inside the card.
 */
const BREAK = "word-break:break-word;overflow-wrap:anywhere;";

/**
 * A usable first name, or nothing.
 *
 * Naively taking the first whitespace token produces "Thank you, Dr" for
 * "Dr Amara Okonkwo", which is worse than no greeting at all. This strips
 * the common titles first, and gives up rather than guessing when what is
 * left is an initial. The route is international, so it stays conservative.
 */
const TITLES = new Set([
  "dr", "dr.", "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "mx", "mx.", "miss",
  "prof", "prof.", "professor", "sir", "dame", "lord", "lady", "rev", "rev.",
]);

export function firstNameOf(fullName: string | null | undefined): string | null {
  if (!fullName) return null;
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  while (parts.length > 0 && TITLES.has(parts[0].toLowerCase())) parts.shift();
  const candidate = parts[0];
  if (!candidate) return null;
  if (candidate.replace(/\./g, "").length < 2) return null;
  return candidate;
}

/* ========================================================================= */
/*  Shell and parts                                                          */
/* ========================================================================= */

/**
 * Brand email shell shared by every message: ink header with the wordmark,
 * white card body, quiet regulatory footer. Table-based and fully inlined so
 * it renders cleanly in Gmail, Outlook and Apple Mail; no external images.
 *
 * `preheader` is the grey line a client shows beside the subject in the
 * inbox list. Left unset, clients grab the first text they find, which is
 * the wordmark.
 */
function emailShell(opts: { preheader: string; body: string }): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const host = siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(SITE_NAME)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAPER};-webkit-text-size-adjust:100%;">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">${esc(opts.preheader)}</div>
<div style="display:none;max-height:0;overflow:hidden;">&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;&#8199;&#65279;&#847;</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${PAPER};">
<tr><td align="center" style="padding:24px 12px 32px;">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;table-layout:fixed;">

    <tr><td style="background-color:${INK};border-radius:14px 14px 0 0;padding:20px 30px;">
      <span style="font-family:${SANS};font-size:19px;font-weight:bold;color:#ffffff;letter-spacing:-0.2px;">
        UK Innovator <span style="color:${CRIMSON};">Founder</span>
      </span>
    </td></tr>

    <tr><td style="background-color:#ffffff;border-left:1px solid ${RULE};border-right:1px solid ${RULE};border-top:3px solid ${CRIMSON};padding:30px;">
      ${opts.body}
    </td></tr>

    <tr><td style="background-color:${INK};border-radius:0 0 14px 14px;padding:22px 30px;">
      <p style="margin:0 0 9px;font-family:${SANS};font-size:12px;line-height:1.65;color:#9aa1ab;">
        <a href="mailto:${esc(SUPPORT_EMAIL)}" style="color:#c7ccd3;text-decoration:none;">${esc(SUPPORT_EMAIL)}</a>
        &nbsp;&middot;&nbsp; <a href="tel:${SUPPORT_PHONE.replace(/\s/g, "")}" style="color:#c7ccd3;text-decoration:none;">${esc(SUPPORT_PHONE)}</a>
        ${host ? `&nbsp;&middot;&nbsp; <a href="${esc(siteUrl)}" style="color:#c7ccd3;text-decoration:none;">${esc(host)}</a>` : ""}
      </p>
      <p style="margin:0;font-family:${SANS};font-size:11.5px;line-height:1.6;color:#808993;">
        ${esc(IAA_NOTE)}
      </p>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;
}

const P = `margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.65;color:#333a42;${BREAK}`;
const H2 = `margin:0 0 18px;font-family:${SERIF};font-size:24px;line-height:1.25;color:${INK};${BREAK}`;
const EYEBROW = `margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${CRIMSON};`;
const SIGNOFF_LEAD = `margin:0;font-family:${SANS};font-size:15px;line-height:1.65;color:#333a42;`;
const SIGNOFF_NAME = `margin:0 0 4px;font-family:${SANS};font-size:15px;font-weight:bold;color:${INK};`;

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 20px;"><tr>
    <td style="background-color:${CRIMSON};border-radius:999px;">
      <a href="${esc(href)}" style="display:inline-block;padding:13px 30px;font-family:${SANS};font-size:14px;font-weight:bold;color:#ffffff;text-decoration:none;">${esc(label)}</a>
    </td>
  </tr></table>`;
}

/** The tracking reference, set as the credential it is. */
function refPill(trackingRef: string): string {
  return `<p style="margin:0 0 20px;">
    <span style="display:inline-block;background-color:${CRIMSON_TINT};color:${INK};font-weight:bold;padding:10px 18px;border-radius:999px;font-family:${MONO};font-size:17px;letter-spacing:1px;">${esc(trackingRef)}</span>
  </p>`;
}

/** Label/value rows, used for the lead detail block. */
function ledger(pairs: [string, string | null | undefined][]): string {
  const rows = pairs
    .filter(([, v]) => Boolean(v))
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:13px 14px 9px 0;border-top:1px solid ${RULE};font-family:${SANS};font-size:10.5px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;color:#8a919c;white-space:nowrap;vertical-align:top;width:150px;">
          ${esc(label)}
        </td>
        <td style="padding:9px 0;border-top:1px solid ${RULE};font-family:${SANS};font-size:15px;line-height:1.5;color:${INK};vertical-align:top;${BREAK}">
          ${esc(value)}
        </td>
      </tr>`,
    )
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 22px;table-layout:fixed;">${rows}</table>`;
}

/* ========================================================================= */
/*  Lead emails (Free CV & Profile Check)                                    */
/* ========================================================================= */

export type LeadEmailInput = {
  fullName: string | null;
  email: string;
  phone: string | null;
  country: string | null;
  hasIdea: string | null;
  investmentBudget: string | null;
  cvFileName: string | null;
};

/**
 * What an adviser will actually do next, in order.
 *
 * ⚠️ COMPLIANCE: we must never offer to supply, suggest or match a business
 * idea. Where someone says they have no idea yet, the only thing we may say
 * is that they need to develop their own and that we will then review,
 * discuss and help refine it. Do not soften this wording.
 */
function leadSteps(lead: LeadEmailInput): [string, string][] {
  const needsIdeas = lead.hasIdea === "no";
  return [
    [
      "We review your CV",
      "An adviser reads your CV and profile against the Innovator Founder criteria: new, innovative, viable and scalable.",
    ],
    [
      "We prepare your free assessment",
      needsIdeas
        ? "You told us you do not have a business idea yet. We cannot provide one, so you will need to research and develop your own. Once you have it, we will discuss it with you, point out the weaknesses and help you refine it."
        : "We consider how your existing business idea could be developed into a proposition an Endorsing Body can assess.",
    ],
    [
      "We contact you",
      `You will usually hear from us within one to two working days${lead.phone ? ", by WhatsApp or email," : " by email"} to talk through your options. There is no charge and no obligation at this stage.`,
    ],
  ];
}

/** Confirmation to the applicant after the Free CV & Profile Check form. */
export function leadConfirmationEmail(lead: LeadEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const first = firstNameOf(lead.fullName);
  const steps = leadSteps(lead);

  const stepsHtml = steps
    .map(
      ([title, desc], i) => `
      <tr>
        <td valign="top" style="padding:0 14px 18px 0;width:30px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td align="center" style="width:30px;height:30px;background-color:${CRIMSON_TINT};border-radius:50%;font-family:${SANS};font-size:13px;font-weight:bold;color:${CRIMSON};">${i + 1}</td>
          </tr></table>
        </td>
        <td valign="top" style="padding:0 0 18px;${BREAK}">
          <p style="margin:0 0 3px;font-family:${SANS};font-size:14.5px;font-weight:bold;color:${INK};">${esc(title)}</p>
          <p style="margin:0;font-family:${SANS};font-size:13.5px;line-height:1.6;color:${BODY_TEXT};">${esc(desc)}</p>
        </td>
      </tr>`,
    )
    .join("");

  const html = emailShell({
    preheader: "An adviser will come back to you within one to two working days.",
    body: `
    <p style="${EYEBROW}">Free CV &amp; profile check</p>
    <h2 style="${H2}">Thank you${first ? `, ${esc(first)}` : ""}. Your CV is with our team.</h2>
    <p style="${P}">We have your details${lead.cvFileName ? " and your CV" : ""}, and your free initial assessment is underway. Here is what happens next:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 4px;table-layout:fixed;">${stepsHtml}</table>
    <p style="${P}">If anything changes, or you would like to add to your enquiry, simply reply to this email.</p>
    <p style="${SIGNOFF_LEAD}">Kind regards,</p>
    <p style="${SIGNOFF_NAME}">The ${esc(SITE_NAME)} team</p>
  `,
  });

  const t: string[] = [
    first ? `Thank you, ${first}. Your CV is with our team.` : "Your CV is with our team.",
    "",
    `We have your details${lead.cvFileName ? " and your CV" : ""}, and your free initial assessment`,
    "is underway. Here is what happens next:",
    "",
  ];
  steps.forEach(([title, desc], i) => t.push(`${i + 1}. ${title}`, `   ${desc}`, ""));
  t.push(
    "If anything changes, or you would like to add to your enquiry, simply reply to this email.",
    "",
    `Kind regards,`,
    `The ${SITE_NAME} team`,
    "",
    `${SUPPORT_EMAIL} · ${SUPPORT_PHONE}`,
    IAA_NOTE,
  );

  return {
    subject: first
      ? `We have your CV, ${first}. Here is what happens next`
      : "We have your CV. Here is what happens next",
    html,
    text: t.join("\n"),
  };
}

/** Internal notification to the admin: full form details, CV attached. */
export function leadAdminEmail(lead: LeadEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const who = lead.fullName || lead.email;
  const ideaLabel =
    lead.hasIdea === "yes"
      ? "Has an idea"
      : lead.hasIdea === "no"
        ? "No idea yet"
        : null;

  const pairs: [string, string | null | undefined][] = [
    ["Email", lead.email],
    ["WhatsApp / phone", lead.phone],
    ["Country", lead.country],
    ["Business idea", ideaLabel],
    ["Investment budget", lead.investmentBudget],
    ["CV", lead.cvFileName],
  ];

  const html = emailShell({
    preheader: `${lead.country ? `${lead.country}. ` : ""}${ideaLabel ?? ""} Reply to this email to answer them.`,
    body: `
    <p style="${EYEBROW}">New enquiry</p>
    <h2 style="${H2}">${esc(who)}</h2>
    ${ledger(pairs)}
    <p style="${P}">Hit reply and it goes straight back to ${esc(lead.email)}.</p>
    ${siteUrl ? ctaButton(`${siteUrl}/admin`, "Open the back office") : ""}
    <p style="margin:0;font-family:${SANS};font-size:12.5px;line-height:1.6;color:#8a919c;">
      The lead is saved in the back office. This message carries personal data${lead.cvFileName ? ", and a CV is special category data more often than not" : ""}. Handle it the way the privacy policy says.
    </p>
  `,
  });

  const lines: string[] = ["NEW CV LEAD", "", who, ""];
  pairs
    .filter(([, v]) => Boolean(v))
    .forEach(([k, v]) => lines.push(`${k.padEnd(18)} ${v}`));
  lines.push("", `Reply to this email to answer ${lead.email} directly.`);
  if (siteUrl) lines.push(`Back office: ${siteUrl}/admin`);
  lines.push("", "Carries personal data. Handle per the privacy policy.");

  return {
    subject: `New CV lead: ${who}${lead.country ? ` (${lead.country})` : ""}`,
    html,
    text: lines.join("\n"),
  };
}

/* ========================================================================= */
/*  Case emails                                                              */
/* ========================================================================= */

/** The seven stages as a table, with the current one marked. */
function stageTable(caseStage: number, stage5Outcome?: Stage5Outcome | null): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${RULE};border-radius:10px;margin:0 0 20px;table-layout:fixed;">
    ${CASE_STAGES.map((s, i) => {
      const done = i < caseStage;
      const here = i === caseStage;
      return `<tr>
      <td style="padding:7px 12px;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:12px;font-weight:bold;color:#8a919c;white-space:nowrap;width:54px;">${esc(s.code)}</td>
      <td style="padding:7px 12px;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:13.5px;color:${here ? CRIMSON : done ? INK : "#8a919c"};${here || done ? "font-weight:bold;" : ""}${BREAK}">
        ${esc(done ? completedLabelFor(i, stage5Outcome) : s.title)}
      </td>
      <td style="padding:7px 12px;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:12.5px;color:${done ? GREEN : "#8a919c"};white-space:nowrap;width:92px;">
        ${done ? "Completed" : here ? "In progress" : "&mdash;"}
      </td>
    </tr>`;
    }).join("")}
  </table>`;
}

/** Plain-text version of the stage list. */
function stageText(caseStage: number, stage5Outcome?: Stage5Outcome | null): string {
  return CASE_STAGES.map((s, i) => {
    const done = i < caseStage;
    const here = i === caseStage;
    const mark = done ? "[x]" : here ? "[>]" : "[ ]";
    return `${mark} ${s.code}  ${done ? completedLabelFor(i, stage5Outcome) : s.title}`;
  }).join("\n");
}

/**
 * Welcome email when a case is opened: gives the client their tracking
 * number, the tracker link and the seven stages ahead.
 */
export function caseOpenedEmail(input: { clientName: string; trackingRef: string }): {
  subject: string;
  html: string;
  text: string;
} {
  const { clientName, trackingRef } = input;
  const first = firstNameOf(clientName);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const html = emailShell({
    preheader: `Your case tracking number is ${trackingRef}. Keep it safe.`,
    body: `
    <p style="${EYEBROW}">Your endorsement case is open</p>
    <h2 style="${H2}">Welcome${first ? `, ${esc(first)}` : ""}. Your case is open.</h2>
    <p style="${P}">We have opened your Innovator Founder endorsement case. This is your case tracking number. Keep it safe:</p>
    ${refPill(trackingRef)}
    <p style="${P}">You can check exactly where your case is, at any time:</p>
    ${siteUrl ? ctaButton(`${siteUrl}/case-tracker`, "Track your case") : ""}
    <p style="${P}">Your case moves through these seven stages. We will email you each time one completes:</p>
    ${stageTable(0)}
    <p style="${P}">First up: we are reviewing your CV, qualification details and any business idea or market research you have given us. If you have anything to add, simply reply to this email.</p>
    <p style="${SIGNOFF_LEAD}">Kind regards,</p>
    <p style="${SIGNOFF_NAME}">The ${esc(SITE_NAME)} team</p>
  `,
  });

  const t = [
    first ? `Welcome, ${first}. Your case is open.` : "Your case is open.",
    "",
    "We have opened your Innovator Founder endorsement case. This is your case",
    "tracking number. Keep it safe:",
    "",
    `    ${trackingRef}`,
    "",
    siteUrl ? `Track your case: ${siteUrl}/case-tracker` : "",
    "",
    "Your case moves through these seven stages. We will email you each time one completes:",
    "",
    stageText(0),
    "",
    "First up: we are reviewing your CV, qualification details and any business idea or",
    "market research you have given us. If you have anything to add, reply to this email.",
    "",
    "Kind regards,",
    `The ${SITE_NAME} team`,
    "",
    `${SUPPORT_EMAIL} · ${SUPPORT_PHONE}`,
    IAA_NOTE,
  ];

  return {
    subject: `Your case is open${first ? `, ${first}` : ""}. Tracking number: ${trackingRef}`,
    html,
    text: t.join("\n"),
  };
}

/**
 * Progress update when an admin moves a case to a new stage.
 *
 * This used to build its own markup, so it was the one email that arrived
 * without the header, footer or regulatory note. It now goes through the
 * same shell as the other three.
 */
export function caseProgressEmail(input: {
  clientName: string;
  trackingRef: string;
  caseStage: number;
  stage5Outcome?: Stage5Outcome | null;
}): { subject: string; html: string; text: string } {
  const { clientName, trackingRef, caseStage, stage5Outcome } = input;
  const first = firstNameOf(clientName);
  const status = currentStatusLabel(caseStage, stage5Outcome);
  const message = latestUpdateMessage(caseStage, stage5Outcome);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const latestDone = caseStage > 0 ? completedLabelFor(caseStage - 1, stage5Outcome) : null;

  const html = emailShell({
    preheader: `${status}. Case ${trackingRef}.`,
    body: `
    <p style="${EYEBROW}">Case update</p>
    <h2 style="${H2}">${esc(status)}</h2>
    <p style="${P}">Dear ${esc(first ?? clientName)},</p>
    ${latestDone ? `<p style="${P}"><strong style="color:${INK};">${esc(latestDone)}</strong></p>` : ""}
    <p style="${P}">${esc(message)}</p>
    ${refPill(trackingRef)}
    ${stageTable(caseStage, stage5Outcome)}
    ${siteUrl ? ctaButton(`${siteUrl}/case-tracker`, "Track your case") : ""}
    <p style="margin:0;font-family:${SANS};font-size:13px;line-height:1.6;color:${BODY_TEXT};">
      Questions? Reply to this email, or contact ${esc(SUPPORT_EMAIL)}.
    </p>
  `,
  });

  const t = [
    status,
    "",
    `Dear ${first ?? clientName},`,
    "",
    latestDone ? `${latestDone}\n` : "",
    message,
    "",
    `Case tracking number: ${trackingRef}`,
    "",
    stageText(caseStage, stage5Outcome),
    "",
    siteUrl ? `Track your case: ${siteUrl}/case-tracker` : "",
    "",
    `Questions? Reply to this email, or contact ${SUPPORT_EMAIL}.`,
    "",
    `${SUPPORT_EMAIL} · ${SUPPORT_PHONE}`,
    IAA_NOTE,
  ];

  return { subject: `Case ${trackingRef}: ${status}`, html, text: t.join("\n") };
}
