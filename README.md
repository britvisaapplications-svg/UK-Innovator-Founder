# UK Innovator Founder Visa — Website + Case Tracker + Back Office

Next.js 16 (App Router) · TypeScript · Material UI 9 · Drizzle ORM · Turso (libSQL) · Vercel Blob

Requirements source: `docs/PROJECT- INVT VISA.pdf`, `docs/Innovator Founder Visa case tracker.pdf`,
`docs/REQUIREMENTS-CHECKLIST.md`. Branding (crimson/ink palette, MUI conventions) follows the
existing `ivisa` project.

## What's here

- **Homepage** — all 18 sections from the brief: hero with animated benefit chips + coloured
  smooth-scroll tiles + the Free CV & Profile Check form (CV upload included), 9-step journey
  staircase, two-stage explainer, 7 benefits, 4 eligibility pillars, 12-step endorsement ladder,
  4-week timeline, Endorsing Body assessment + fees, 8 "why applications fail" pairs, packages
  (Premium highlighted), after-visa/ILR timeline, 17 FAQs, final conversion section.
- **Case Tracker** (`/case-tracker`) — public lookup by tracking number; 7 stages matching the
  client's case-tracker document, including the Stage 5 pass/fail branch.
- **Back office** (`/admin`) — leads pipeline (status, internal notes, private CV download,
  convert-to-case) and case management ("Approve → next stage" button, Stage 5 pass/unsuccessful
  decision, rollback dropdown, internal notes). Stage changes update the public tracker
  immediately and email the client when an email provider is configured.
- **Secondary + legal pages** — team, office, approved cases, about, contact, endorsement/visa
  support pages, and all 7 legal policies as dedicated pages. Legal copy is **draft only** and
  flagged for lawyer review in the UI.

## Setup

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run db:migrate           # apply migrations
npm run db:make-admin -- you@example.com 'your-password' "Your Name"
npm run dev
```

`.env.local` currently points at a **local dev database** (`file:./dev.db`).

### Switching to the production Turso database

The Turso DB exists: https://app.turso.tech/britvisa/databases/uk-innovator-founder-visa

1. Mint a token: dashboard → database → *Generate token*, or `turso db tokens create uk-innovator-founder-visa`
2. In `.env.local` (and Vercel env), set:
   ```
   TURSO_DATABASE_URL="libsql://uk-innovator-founder-visa-britvisa.aws-us-east-1.turso.io"
   TURSO_AUTH_TOKEN="<token>"
   ```
3. `npm run db:migrate` then `npm run db:make-admin -- …` against production.

### Other environment variables

| Var | Purpose |
|---|---|
| `AUTH_SECRET` | HMAC key for admin session cookies (`openssl rand -hex 32`) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob store for private CV uploads (leads still save without it) |
| `RESEND_API_KEY` / `EMAIL_FROM` | Stage-update emails to clients (skipped when unset) |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL used in emails |
| `CASE_EMAIL_ON_UPDATE` | Set `off` to suppress automatic stage emails |

## How the case tracker model works

`caseStage` = **number of completed stages** (0–7). The next stage is the single "Awaiting"
stage. Completing Stage 5 (Endorsement Body Initial Assessment) requires an outcome:

- **pass** → journey continues to interview
- **fail** → journey pauses; tracker shows the contact-your-caseworker message; admin can
  "Reopen at Stage 5" for a revised application

Stage completion timestamps live in `caseHistory` (JSON stage-index → unix seconds) and are
shown as "Completed on" dates in the tracker. Single source of truth: `src/lib/caseStages.ts`.

## Before launch — confirm with the client

- Legal entity name, IAA registration number, office address, phone/WhatsApp, support email
  (`src/lib/site.ts`) and final logo (`src/components/Logo.tsx`)
- All 7 legal policies must be reviewed/approved by lawyers (drafts are flagged in the UI)
- Package prices shown as ranges — confirm
- Copy for team/office/approved-cases pages
- Open questions listed in `docs/REQUIREMENTS-CHECKLIST.md` §25

## Scripts

`db:generate` (emit migration from schema) · `db:migrate` · `db:push` · `db:studio` ·
`db:check` (connectivity) · `db:seed` (sample leads + case) · `db:make-admin`
