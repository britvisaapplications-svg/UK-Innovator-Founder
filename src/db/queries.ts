import "server-only";

import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import {
  users,
  leads,
  cases,
  type Lead,
  type Case,
  type LeadStatus,
  type PackageTier,
  type User,
} from "./schema";
import { clampStage, type Stage5Outcome, STAGE5_INDEX } from "@/lib/caseStages";

const now = () => Math.floor(Date.now() / 1000);

/* -------------------------------------------------------------------- users */

export async function getUserById(id: string): Promise<User | undefined> {
  return db.query.users.findFirst({ where: eq(users.id, id) });
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  return db.query.users.findFirst({
    where: eq(users.email, email.trim().toLowerCase()),
  });
}

/* -------------------------------------------------------------------- leads */

export async function createLead(input: {
  fullName?: string | null;
  phone?: string | null;
  email: string;
  country?: string | null;
  hasIdea?: string | null;
  investmentBudget?: string | null;
  cvUrl?: string | null;
  cvFileName?: string | null;
}): Promise<Lead> {
  const [row] = await db
    .insert(leads)
    .values({ id: crypto.randomUUID(), ...input, email: input.email.trim().toLowerCase() })
    .returning();
  return row;
}

export async function listLeads(): Promise<Lead[]> {
  return db.query.leads.findMany({ orderBy: [desc(leads.createdAt)] });
}

export async function getLeadById(id: string): Promise<Lead | undefined> {
  return db.query.leads.findFirst({ where: eq(leads.id, id) });
}

export async function updateLead(
  id: string,
  patch: Partial<{ status: LeadStatus; adminNote: string }>,
): Promise<Lead | undefined> {
  const [row] = await db
    .update(leads)
    .set({ ...patch, updatedAt: now() })
    .where(eq(leads.id, id))
    .returning();
  return row;
}

/* -------------------------------------------------------------------- cases */

/** Parse the stageIndex -> completed-at-unix-seconds history map. */
export function parseCaseHistory(raw: string | null): Record<number, number> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export async function createCase(input: {
  leadId?: string | null;
  trackingRef: string;
  clientName: string;
  email: string;
  phone?: string | null;
  packageTier?: PackageTier | null;
}): Promise<Case> {
  const [row] = await db
    .insert(cases)
    .values({
      id: crypto.randomUUID(),
      ...input,
      email: input.email.trim().toLowerCase(),
      caseStage: 0,
      caseHistory: "{}",
      caseUpdatedAt: now(),
    })
    .returning();
  return row;
}

export async function listCases(): Promise<Case[]> {
  return db.query.cases.findMany({ orderBy: [desc(cases.createdAt)] });
}

export async function getCaseByTrackingRef(ref: string): Promise<Case | undefined> {
  return db.query.cases.findFirst({
    where: eq(cases.trackingRef, ref.trim().toUpperCase()),
  });
}

/**
 * Set a case's progress: `completedCount` stages are complete (0..7), with an
 * optional Stage 5 outcome. Newly-completed stages are stamped into the
 * history map; rolled-back stages have their stamps removed so the tracker
 * never shows a completion date for an incomplete stage. Clearing/repassing
 * Stage 5 clears or overwrites the outcome accordingly.
 */
export async function setCaseStage(
  id: string,
  completedCount: number,
  stage5Outcome?: Stage5Outcome | null,
): Promise<Case | undefined> {
  const existing = await db.query.cases.findFirst({ where: eq(cases.id, id) });
  if (!existing) return undefined;

  const next = clampStage(completedCount);
  const history = parseCaseHistory(existing.caseHistory);
  const at = now();
  for (let i = 0; i < next; i++) if (history[i] == null) history[i] = at;
  for (let i = next; i < 8; i++) delete history[i];

  // The outcome only exists while Stage 5 is complete.
  const outcome = next >= STAGE5_INDEX + 1 ? (stage5Outcome ?? existing.stage5Outcome) : null;

  const [row] = await db
    .update(cases)
    .set({
      caseStage: next,
      stage5Outcome: outcome,
      caseHistory: JSON.stringify(history),
      caseUpdatedAt: at,
      updatedAt: at,
    })
    .where(eq(cases.id, id))
    .returning();
  return row;
}

export async function setCaseNote(id: string, note: string): Promise<Case | undefined> {
  const [row] = await db
    .update(cases)
    .set({ adminNote: note, updatedAt: now() })
    .where(eq(cases.id, id))
    .returning();
  return row;
}
