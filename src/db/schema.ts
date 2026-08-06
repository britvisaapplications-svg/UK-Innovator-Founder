import { sql, relations } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

/**
 * Database schema (libSQL / SQLite via Turso).
 *
 * Conventions:
 *  - String IDs (UUIDs) generated in app code, portable across DBs.
 *  - `created_at` / `updated_at` are unix-epoch integers (UTC seconds).
 *  - snake_case column names; camelCase TS fields.
 *  - Status fields use string enums so new states are an additive change.
 *
 * To evolve the schema: edit this file, then `npm run db:generate` to emit a
 * timestamped SQL migration into ./drizzle, and `npm run db:migrate` to apply
 * it. Never hand-edit generated migrations.
 */

const timestamps = {
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
};

/* -------------------------------------------------------------------- users */

/** Back-office accounts. Only "admin" unlocks the dashboard at /admin. */
export const USER_ROLES = ["user", "admin"] as const;

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: USER_ROLES }).notNull().default("user"),
  ...timestamps,
});

/* -------------------------------------------------------------------- leads */

/** Free CV & Profile Check submissions from the homepage lead form. */
export const LEAD_STATUSES = [
  "new",
  "reviewing",
  "contacted",
  "converted",
  "closed",
] as const;

export const leads = sqliteTable(
  "leads",
  {
    id: text("id").primaryKey(),

    fullName: text("full_name"),
    phone: text("phone"), // WhatsApp / phone
    email: text("email").notNull(),
    country: text("country"), // country of residence
    hasIdea: text("has_idea"), // "yes" | "no"
    investmentBudget: text("investment_budget"),

    // CV upload (Vercel Blob, access:"private", streamed to admins via
    // the admin-gated /api/admin/file route, never a public URL).
    cvUrl: text("cv_url"),
    cvFileName: text("cv_file_name"),

    status: text("status", { enum: LEAD_STATUSES }).notNull().default("new"),
    adminNote: text("admin_note"), // internal-only, never shown to the client

    ...timestamps,
  },
  (t) => [index("leads_email_idx").on(t.email), index("leads_status_idx").on(t.status)],
);

/* -------------------------------------------------------------------- cases */

export const PACKAGE_TIERS = ["basic", "standard", "premium"] as const;

/**
 * Endorsement cases shown on the public Case Tracker.
 *
 *   trackingRef   : public, hard-to-guess tracking number (e.g. IFV-4K7Q-9MX2).
 *   caseStage     : NUMBER of completed stages (0..7), see lib/caseStages.
 *   stage5Outcome : "pass" | "fail" once Stage 5 completes (branching stage).
 *   caseHistory   : JSON map of stageIndex -> unix seconds it was completed.
 *   adminNote     : internal-only note, never returned to the client.
 */
export const cases = sqliteTable(
  "cases",
  {
    id: text("id").primaryKey(),
    // Optional link back to the lead this case was converted from.
    leadId: text("lead_id").references(() => leads.id, { onDelete: "set null" }),

    trackingRef: text("tracking_ref").notNull().unique(),
    clientName: text("client_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    packageTier: text("package_tier", { enum: PACKAGE_TIERS }),

    caseStage: integer("case_stage").notNull().default(0),
    stage5Outcome: text("stage5_outcome"), // "pass" | "fail" | null
    caseHistory: text("case_history"),
    caseUpdatedAt: integer("case_updated_at"),
    adminNote: text("admin_note"),

    ...timestamps,
  },
  (t) => [
    index("cases_tracking_ref_idx").on(t.trackingRef),
    index("cases_email_idx").on(t.email),
    index("cases_lead_id_idx").on(t.leadId),
  ],
);

/* -------------------------------------------------------------- relations */

export const leadsRelations = relations(leads, ({ many }) => ({
  cases: many(cases),
}));

export const casesRelations = relations(cases, ({ one }) => ({
  lead: one(leads, { fields: [cases.leadId], references: [leads.id] }),
}));

/* ------------------------------------------------------------------- types */

export type UserRole = (typeof USER_ROLES)[number];
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type PackageTier = (typeof PACKAGE_TIERS)[number];

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Case = typeof cases.$inferSelect;
export type NewCase = typeof cases.$inferInsert;
