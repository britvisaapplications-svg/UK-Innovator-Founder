/**
 * Render every transactional email to an HTML file and open nothing, send
 * nothing, store nothing.
 *
 *   npm run email:preview
 *
 * Writes to .email-preview/ (gitignored). Four message types, plus the
 * awkward cases: someone with no business idea yet (which has its own
 * compliance wording), a title in the name, and long unbroken strings,
 * which are what actually break email tables.
 */
import { config } from "dotenv";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import Module from "node:module";

config({ path: ".env.local" });

const outDir = join(process.cwd(), ".email-preview");
mkdirSync(outDir, { recursive: true });
const stub = join(outDir, "server-only-stub.cjs");
writeFileSync(stub, "module.exports = {};");
const resolver = Module as unknown as {
  _resolveFilename(request: string, ...rest: unknown[]): string;
};
const original = resolver._resolveFilename;
resolver._resolveFilename = function (request: string, ...rest: unknown[]) {
  if (request === "server-only") return stub;
  return original.call(this, request, ...rest);
};

const { leadAdminEmail, leadConfirmationEmail, caseOpenedEmail, caseProgressEmail } =
  await import("../src/lib/email.js");

const lead = {
  fullName: "Dr Amara Okonkwo",
  email: "amara@example.com",
  phone: "+44 7700 900142",
  country: "Nigeria",
  hasIdea: "yes",
  investmentBudget: "£50,000 - £100,000",
  cvFileName: "amara-okonkwo-cv.pdf",
};
const noIdea = { ...lead, fullName: "Chen Wei", hasIdea: "no", cvFileName: null, phone: null };
const stress = {
  ...lead,
  fullName: "Konstantinos Papadimitriou-Alexandropoulos",
  email: "k.papadimitriou-alexandropoulos@institute-for-advanced-study.example.gr",
  country: "Greece",
  // An ampersand and a tag: these used to go into the HTML unescaped.
  investmentBudget: "£100,000+ <script>alert(1)</script> R&D",
  cvFileName: "2026-curriculum-vitae-and-supporting-schedules-final-v7.pdf",
};

const out: [string, { subject: string; html: string; text: string }][] = [
  ["lead-confirmation", leadConfirmationEmail(lead)],
  ["lead-confirmation-no-idea", leadConfirmationEmail(noIdea)],
  ["lead-admin", leadAdminEmail(lead)],
  ["lead-admin-stress", leadAdminEmail(stress)],
  ["case-opened", caseOpenedEmail({ clientName: "Dr Amara Okonkwo", trackingRef: "IF-2026-0481" })],
  [
    "case-progress",
    caseProgressEmail({
      clientName: "Dr Amara Okonkwo",
      trackingRef: "IF-2026-0481",
      caseStage: 3,
      stage5Outcome: null,
    }),
  ],
];

for (const [name, m] of out) {
  writeFileSync(join(outDir, `${name}.html`), m.html);
  writeFileSync(join(outDir, `${name}.txt`), `Subject: ${m.subject}\n\n${m.text}`);
  console.log(`${name.padEnd(28)} ${m.subject}`);
}
console.log(`\n${out.length * 2} files in .email-preview/ — nothing was sent.`);
