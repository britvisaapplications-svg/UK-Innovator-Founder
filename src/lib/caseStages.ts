/**
 * Endorsement Case Tracker stages, the single source of truth for the
 * client-facing journey. Shared by the tracker UI, the lookup API, the admin
 * console and notification emails so they never drift apart.
 *
 * The 7 stages mirror the client's "Innovator Founder Visa, Endorsement
 * Case Tracker" document exactly.
 *
 * Progress model:
 *   `caseStage` on a case = the NUMBER of completed stages (0..7).
 *     - 0  → nothing complete; Stage 1 shows as "Awaiting".
 *     - n  → stages 1..n complete; stage n+1 is the single "Awaiting" stage.
 *     - 7  → the whole journey is complete.
 *
 *   Stage 5 (Endorsement Body Initial Assessment) is the one branching stage:
 *   completing it records an outcome, "pass" (proceed to interview) or
 *   "fail" (journey pauses; the client is invited to contact their
 *   caseworker about a revised application, depending on their package).
 */

export type Stage5Outcome = "pass" | "fail";

export type CaseStage = {
  /** Stable key (used in URLs/emails); never reuse or renumber existing keys. */
  key: string;
  /** Label shown on the stepper, e.g. "Stage 3". */
  code: string;
  /** Short title for the stepper. */
  title: string;
  /** Heading shown while this stage is the current "Awaiting" one. */
  awaitingLabel: string;
  /** Heading shown once this stage is completed. */
  completedLabel: string;
  /** Client-facing message while awaiting. */
  awaitingDesc: string;
  /** Client-facing message once completed. */
  completedDesc: string;
};

export const CASE_STAGES: CaseStage[] = [
  {
    key: "initial_information",
    code: "Stage 1",
    title: "Initial Information",
    awaitingLabel: "Awaiting Initial Information",
    completedLabel: "Initial Information Received",
    awaitingDesc:
      "We are awaiting your CV, qualification details, and any innovative business idea or market research you wish to provide.",
    completedDesc:
      "We have received your CV, qualification details, and supporting information to begin your endorsement application.",
  },
  {
    key: "idea_assessment",
    code: "Stage 2",
    title: "Business Idea Assessment & Refinement",
    awaitingLabel: "Awaiting Business Idea Assessment",
    completedLabel: "Business Idea Approved",
    awaitingDesc:
      "We are reviewing and refining your business idea before discussing it with you.",
    completedDesc:
      "Your business idea has been discussed with you, refined where necessary, and approved by you to proceed.",
  },
  {
    key: "business_plan",
    code: "Stage 3",
    title: "Business Plan & Financial Forecasts",
    awaitingLabel: "Awaiting Business Plan & Financials",
    completedLabel: "Business Plan & Financials Approved",
    awaitingDesc:
      "We are preparing your business plan and financial forecasts for your review.",
    completedDesc:
      "Your business plan and financial forecasts have been discussed with you, finalised, and approved by you to proceed.",
  },
  {
    key: "final_documents",
    code: "Stage 4",
    title: "Final Document Assessment",
    awaitingLabel: "Awaiting Final Document Assessment",
    completedLabel: "Final Documents Approved",
    awaitingDesc:
      "We are assessing your final supporting documents, including the Letter of Intent (LOI), Minimum Viable Product (MVP), and any additional documents required before submission.",
    completedDesc:
      "All required supporting documents have been assessed, finalised, and approved for submission.",
  },
  {
    key: "initial_assessment",
    code: "Stage 5",
    title: "Endorsement Body Initial Assessment",
    awaitingLabel: "Awaiting Initial Assessment",
    completedLabel: "Initial Assessment Decision Received",
    awaitingDesc:
      "Your endorsement application is awaiting the endorsement body's initial assessment.",
    completedDesc:
      "The endorsement body has completed its initial assessment of your application.",
  },
  {
    key: "interview",
    code: "Stage 6",
    title: "Endorsement Body Interview",
    awaitingLabel: "Awaiting Interview",
    completedLabel: "Interview Completed",
    awaitingDesc:
      "If required, the endorsement body may invite you to attend an interview.",
    completedDesc:
      "Your endorsement interview has been completed (where applicable).",
  },
  {
    key: "decision",
    code: "Stage 7",
    title: "Endorsement Decision",
    awaitingLabel: "Awaiting Endorsement Decision",
    completedLabel: "Endorsement Decision Received",
    awaitingDesc:
      "Your endorsement application is awaiting the endorsement body's final decision.",
    completedDesc:
      "The endorsement body has issued its endorsement decision. We will contact you with the outcome and advise you on the next steps.",
  },
];

/** Index of the branching stage (Endorsement Body Initial Assessment). */
export const STAGE5_INDEX = 4;

/** Stage 5's pass/fail completion messages (from the client's tracker doc). */
export const STAGE5_MESSAGES: Record<
  Stage5Outcome,
  { label: string; desc: string }
> = {
  pass: {
    label: "Initial Assessment – Passed",
    desc: "Your application has successfully passed the endorsement body's initial assessment and will proceed to the interview stage (where required). Please note that passing the initial assessment does not mean your endorsement has been approved. A final endorsement decision will only be made after the interview and completion of the endorsement body's assessment process.",
  },
  fail: {
    label: "Initial Assessment – Unsuccessful",
    desc: "Unfortunately, your application did not pass the endorsement body's initial assessment. Depending on the service package you selected, we may be able to prepare and submit a revised endorsement application. Please contact your caseworker to discuss your available options.",
  },
};

export const TOTAL_STAGES = CASE_STAGES.length;

/** Clamp an arbitrary number into a valid completed-count (0..TOTAL_STAGES). */
export function clampStage(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(TOTAL_STAGES, Math.round(n)));
}

export type StageState = "completed" | "awaiting" | "upcoming" | "on-hold";

/**
 * Display state of one stage given the case's progress.
 * When Stage 5 completed with a "fail" outcome, later stages go on hold,
 * the journey pauses until a revised application is agreed.
 */
export function stageState(
  stageIndex: number,
  completedCount: number,
  stage5Outcome?: Stage5Outcome | null,
): StageState {
  const failed = stage5Outcome === "fail" && completedCount >= STAGE5_INDEX + 1;
  if (stageIndex < completedCount) return "completed";
  if (failed) return "on-hold";
  if (stageIndex === completedCount) return "awaiting";
  return "upcoming";
}

/** Whether the whole journey is complete. */
export function isComplete(completedCount: number, stage5Outcome?: Stage5Outcome | null): boolean {
  if (stage5Outcome === "fail") return completedCount >= STAGE5_INDEX + 1;
  return completedCount >= TOTAL_STAGES;
}

/** The client-facing "current status" headline. */
export function currentStatusLabel(
  completedCount: number,
  stage5Outcome?: Stage5Outcome | null,
): string {
  const c = clampStage(completedCount);
  if (stage5Outcome === "fail" && c >= STAGE5_INDEX + 1) return STAGE5_MESSAGES.fail.label;
  if (c >= TOTAL_STAGES) return CASE_STAGES[TOTAL_STAGES - 1].completedLabel;
  return CASE_STAGES[c].awaitingLabel;
}

/** The client-facing "latest update" message for the current position. */
export function latestUpdateMessage(
  completedCount: number,
  stage5Outcome?: Stage5Outcome | null,
): string {
  const c = clampStage(completedCount);
  if (stage5Outcome === "fail" && c >= STAGE5_INDEX + 1) return STAGE5_MESSAGES.fail.desc;
  if (c === STAGE5_INDEX + 1 && stage5Outcome === "pass") return STAGE5_MESSAGES.pass.desc;
  if (c >= TOTAL_STAGES) return CASE_STAGES[TOTAL_STAGES - 1].completedDesc;
  return CASE_STAGES[c].awaitingDesc;
}

/** Completed label for a stage, honouring the Stage 5 outcome. */
export function completedLabelFor(
  stageIndex: number,
  stage5Outcome?: Stage5Outcome | null,
): string {
  if (stageIndex === STAGE5_INDEX && stage5Outcome) {
    return STAGE5_MESSAGES[stage5Outcome].label;
  }
  return CASE_STAGES[stageIndex].completedLabel;
}

/** Completed description for a stage, honouring the Stage 5 outcome. */
export function completedDescFor(
  stageIndex: number,
  stage5Outcome?: Stage5Outcome | null,
): string {
  if (stageIndex === STAGE5_INDEX && stage5Outcome) {
    return STAGE5_MESSAGES[stage5Outcome].desc;
  }
  return CASE_STAGES[stageIndex].completedDesc;
}
