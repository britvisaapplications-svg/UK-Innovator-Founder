"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import {
  CASE_STAGES,
  STAGE5_INDEX,
  STAGE5_MESSAGES,
  TOTAL_STAGES,
  currentStatusLabel,
  type Stage5Outcome,
} from "@/lib/caseStages";

/**
 * Admin control for one case's tracker, the "approve & move to next step"
 * flow. The primary action button completes the current awaiting stage; the
 * public tracker and the notification email reflect it immediately. Stage 5
 * (Endorsement Body Initial Assessment) branches: it completes as either
 * Passed or Unsuccessful. The dropdown allows corrections/rollbacks, and the
 * note field is internal-only.
 */
export default function CaseStageControl({
  caseId,
  trackingRef,
  caseStage,
  stage5Outcome,
  adminNote,
}: {
  caseId: string;
  trackingRef: string;
  caseStage: number;
  stage5Outcome: Stage5Outcome | null;
  adminNote: string | null;
}) {
  const [stage, setStage] = useState(caseStage);
  const [outcome, setOutcome] = useState<Stage5Outcome | null>(stage5Outcome);
  const [note, setNote] = useState(adminNote ?? "");
  const [savedNote, setSavedNote] = useState(adminNote ?? "");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const failed = outcome === "fail" && stage >= STAGE5_INDEX + 1;
  const complete = stage >= TOTAL_STAGES;
  const nextStage = complete ? null : CASE_STAGES[stage];
  const nextIsStage5 = stage === STAGE5_INDEX;

  async function patch(payload: Record<string, unknown>): Promise<Record<string, unknown> | null> {
    setBusy(true);
    setFeedback(null);
    setError(null);
    try {
      const res = await fetch(`/api/admin/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Couldn't save. Try again.");
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't save. Try again.");
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function changeStage(next: number, nextOutcome?: Stage5Outcome | null) {
    const prevStage = stage;
    const prevOutcome = outcome;
    setStage(next);
    if (nextOutcome !== undefined) setOutcome(nextOutcome);
    else if (next < STAGE5_INDEX + 1) setOutcome(null);

    const data = await patch({
      caseStage: next,
      ...(nextOutcome !== undefined ? { stage5Outcome: nextOutcome } : {}),
    });
    if (!data) {
      setStage(prevStage);
      setOutcome(prevOutcome);
      return;
    }
    setOutcome((data.stage5Outcome as Stage5Outcome | null) ?? null);
    setFeedback(data.emailed ? "Stage updated. Client emailed." : "Stage updated.");
  }

  async function saveNote() {
    const data = await patch({ adminNote: note });
    if (data) {
      setSavedNote(note);
      setFeedback("Note saved.");
    }
  }

  return (
    <Box sx={{ mt: 1.5, p: 1.5, borderRadius: 2, bgcolor: "#fff", border: "1px solid", borderColor: "divider" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5, flexWrap: "wrap" }}>
        <TimelineRoundedIcon sx={{ fontSize: 18, color: "primary.main" }} />
        <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", color: "text.secondary" }}>
          Case Tracker
        </Typography>
        <Chip
          size="small"
          label={trackingRef}
          sx={{ fontFamily: "var(--font-geist-mono)", fontWeight: 700, height: 22 }}
        />
        <Chip
          size="small"
          label={currentStatusLabel(stage, outcome)}
          color={failed ? "warning" : complete ? "success" : "default"}
          sx={{ fontWeight: 700, height: 22 }}
        />
        {busy && <CircularProgress size={14} />}
        {feedback && (
          <Typography sx={{ fontSize: 12, color: "success.main", fontWeight: 600 }}>{feedback}</Typography>
        )}
        {error && (
          <Typography sx={{ fontSize: 12, color: "error.main", fontWeight: 600 }}>{error}</Typography>
        )}
      </Stack>

      {/* Primary action: approve / complete the current awaiting stage. */}
      {!complete && nextStage && !failed && (
        <Box sx={{ mb: 1.5 }}>
          {nextIsStage5 ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Button
                size="small"
                variant="contained"
                color="success"
                disabled={busy}
                startIcon={<CheckCircleRoundedIcon />}
                onClick={() => changeStage(STAGE5_INDEX + 1, "pass")}
              >
                {STAGE5_MESSAGES.pass.label}
              </Button>
              <Button
                size="small"
                variant="outlined"
                color="warning"
                disabled={busy}
                startIcon={<CancelRoundedIcon />}
                onClick={() => changeStage(STAGE5_INDEX + 1, "fail")}
              >
                {STAGE5_MESSAGES.fail.label}
              </Button>
            </Stack>
          ) : (
            <Button
              size="small"
              variant="contained"
              disabled={busy}
              startIcon={<CheckCircleRoundedIcon />}
              onClick={() => changeStage(stage + 1)}
            >
              Approve: {nextStage.completedLabel}
            </Button>
          )}
          <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.5 }}>
            Completes {nextStage.code}. The client&apos;s tracker updates immediately
            {nextIsStage5 ? "; unsuccessful pauses the journey with a contact-caseworker message." : "."}
          </Typography>
        </Box>
      )}

      {failed && (
        <Box sx={{ mb: 1.5 }}>
          <Button
            size="small"
            variant="outlined"
            disabled={busy}
            onClick={() => changeStage(STAGE5_INDEX, null)}
          >
            Reopen at Stage 5 (revised application)
          </Button>
        </Box>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ alignItems: { sm: "flex-start" } }}>
        <Box sx={{ minWidth: { sm: 280 } }}>
          <Typography sx={{ fontSize: 11, color: "text.secondary", fontWeight: 700, mb: 0.5 }}>
            Progress (correct / roll back)
          </Typography>
          <Select
            size="small"
            value={failed && stage === STAGE5_INDEX + 1 ? -1 : stage}
            disabled={busy}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v === -1) changeStage(STAGE5_INDEX + 1, "fail");
              else if (v === STAGE5_INDEX + 1) changeStage(v, outcome === "fail" ? "pass" : (outcome ?? "pass"));
              else changeStage(v);
            }}
            fullWidth
            sx={{ fontSize: 13, fontWeight: 600, borderRadius: 2 }}
          >
            <MenuItem value={0} sx={{ fontSize: 13 }}>
              Nothing completed · Awaiting Initial Information
            </MenuItem>
            {CASE_STAGES.map((s, i) =>
              i === STAGE5_INDEX ? (
                [
                  <MenuItem key={`${s.key}-pass`} value={i + 1} sx={{ fontSize: 13 }}>
                    {s.code} · {STAGE5_MESSAGES.pass.label}
                  </MenuItem>,
                  <MenuItem key={`${s.key}-fail`} value={-1} sx={{ fontSize: 13 }}>
                    {s.code} · {STAGE5_MESSAGES.fail.label}
                  </MenuItem>,
                ]
              ) : (
                <MenuItem key={s.key} value={i + 1} sx={{ fontSize: 13 }}>
                  {s.code} · {s.completedLabel}
                </MenuItem>
              ),
            )}
          </Select>
          <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.5 }}>
            Marks that stage (and all before it) complete. The next stage shows as &ldquo;Awaiting&rdquo;.
          </Typography>
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <Typography sx={{ fontSize: 11, color: "text.secondary", fontWeight: 700, mb: 0.5 }}>
            Internal note (not shown to the client)
          </Typography>
          <TextField
            size="small"
            fullWidth
            multiline
            minRows={1}
            value={note}
            disabled={busy}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Optional internal note…"
          />
          <Button
            size="small"
            variant="outlined"
            sx={{ mt: 0.75 }}
            disabled={busy || note === savedNote}
            onClick={saveNote}
          >
            Save note
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
