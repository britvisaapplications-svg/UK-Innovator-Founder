"use client";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import {
  CASE_STAGES,
  STAGE5_INDEX,
  TOTAL_STAGES,
  completedDescFor,
  completedLabelFor,
  currentStatusLabel,
  isComplete,
  latestUpdateMessage,
  stageState,
  type Stage5Outcome,
} from "@/lib/caseStages";
import { SUPPORT_EMAIL } from "@/lib/site";

type Result = {
  clientName: string;
  trackingRef: string;
  caseStage: number;
  stage5Outcome: Stage5Outcome | null;
  history: Record<number, number>;
  caseUpdatedAt: number | null;
  createdAt: number;
};

/**
 * Public Endorsement Case Tracker: enter a tracking reference, see the
 * 7-stage journey with per-stage completion dates. Stage 5 can complete as
 * Passed or Unsuccessful; an unsuccessful outcome pauses the later stages
 * and points the client to their caseworker.
 */
export default function CaseTracker() {
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const canSubmit = reference.trim().length > 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (data?.ok) setResult(data.result as Result);
      else
        setError(
          "We couldn't find a case with that tracking number. Check the reference from your confirmation email and try again.",
        );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fmtDate = (s?: number | null) =>
    s
      ? new Date(s * 1000).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-";

  const stage = result?.caseStage ?? 0;
  const outcome = result?.stage5Outcome ?? null;
  const failed = outcome === "fail" && stage >= STAGE5_INDEX + 1;
  const complete = result ? isComplete(stage, outcome) && !failed : false;
  const progressPct = result ? Math.round((stage / TOTAL_STAGES) * 100) : 0;

  return (
    <Box sx={{ flex: 1, py: { xs: 5, md: 8 } }}>
      <Container sx={{ maxWidth: "760px !important" }}>
        <Stack sx={{ alignItems: "center", textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 } }}>
            Endorsement Case Tracker
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 1.5, maxWidth: 560 }}>
            Enter your case tracking number to see exactly where your endorsement application
            is in the 7-stage journey.
          </Typography>
        </Stack>

        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
          <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
            <Box>
              <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 0.75 }}>
                Case tracking number
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g. IFV-4K7Q-9MX2"
                value={reference}
                onChange={(e) => setReference(e.target.value.toUpperCase())}
                slotProps={{ htmlInput: { autoCapitalize: "characters", spellCheck: false } }}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!canSubmit || loading}
              startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SearchRoundedIcon />}
            >
              {loading ? "Checking…" : "Track my case"}
            </Button>
            {error && (
              <Typography sx={{ color: "error.main", fontSize: 15, fontWeight: 600, textAlign: "center" }}>
                {error}
              </Typography>
            )}
          </Stack>

          {result && (
            <>
              <Divider sx={{ my: 3 }} />

              {/* Header: client + tracking number */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1}
                sx={{ justifyContent: "space-between", alignItems: { sm: "center" }, mb: 2 }}
              >
                <Box>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}
                  >
                    Applicant
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    {result.clientName}
                  </Typography>
                </Box>
                <Chip
                  label={result.trackingRef}
                  sx={{ fontFamily: "var(--font-geist-mono)", fontWeight: 800, bgcolor: "#fbeaec", color: "secondary.main" }}
                />
              </Stack>

              {/* Current status + progress bar */}
              <Box sx={{ mb: 3 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 0.75 }}>
                  <Typography
                    sx={{ fontWeight: 800, color: failed ? "warning.main" : complete ? "success.main" : "primary.main" }}
                  >
                    {currentStatusLabel(stage, outcome)}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", fontWeight: 700 }}>
                    {progressPct}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={progressPct}
                  color={failed ? "warning" : complete ? "success" : "primary"}
                  sx={{ height: 10, borderRadius: 999, bgcolor: "rgba(20,22,28,0.07)" }}
                />
              </Box>

              {/* Latest update */}
              <Box sx={{ bgcolor: failed ? "#fdf0e3" : "#fbeaec", borderRadius: 2.5, p: 2, mb: 3 }}>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: failed ? "warning.main" : "primary.main", mb: 0.5 }}
                >
                  Latest update
                </Typography>
                <Typography sx={{ color: "text.primary", lineHeight: 1.6, fontSize: 15.5 }}>
                  {latestUpdateMessage(stage, outcome)}
                </Typography>
              </Box>

              {/* Stage timeline */}
              <Stack spacing={0} sx={{ mb: 3 }}>
                {CASE_STAGES.map((s, i) => {
                  const state = stageState(i, stage, outcome);
                  const done = state === "completed";
                  const awaiting = state === "awaiting";
                  const onHold = state === "on-hold";
                  const failHere = done && i === STAGE5_INDEX && outcome === "fail";
                  const isLast = i === CASE_STAGES.length - 1;
                  return (
                    <Stack key={s.key} direction="row" spacing={1.75} sx={{ alignItems: "flex-start" }}>
                      {/* Icon rail */}
                      <Stack sx={{ alignItems: "center", alignSelf: "stretch" }}>
                        <Box
                          className={awaiting ? "case-stage-pulse" : undefined}
                          sx={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            flexShrink: 0,
                            color: failHere
                              ? "#fff"
                              : done
                                ? "#fff"
                                : awaiting
                                  ? "primary.main"
                                  : "text.disabled",
                            bgcolor: failHere ? "warning.main" : done ? "primary.main" : "transparent",
                            border: done ? "none" : "2px solid",
                            borderColor: awaiting ? "primary.main" : "divider",
                          }}
                        >
                          {done ? (
                            <CheckCircleRoundedIcon sx={{ fontSize: 22 }} />
                          ) : awaiting ? (
                            <AutorenewRoundedIcon className="case-stage-spin" sx={{ fontSize: 19 }} />
                          ) : onHold ? (
                            <PauseCircleRoundedIcon sx={{ fontSize: 20 }} />
                          ) : (
                            <RadioButtonUncheckedRoundedIcon sx={{ fontSize: 17 }} />
                          )}
                        </Box>
                        {!isLast && (
                          <Box
                            sx={{
                              width: 3,
                              flex: 1,
                              minHeight: 26,
                              my: 0.5,
                              borderRadius: 2,
                              bgcolor: done && !failHere ? "primary.main" : "divider",
                            }}
                          />
                        )}
                      </Stack>

                      {/* Content */}
                      <Box sx={{ pb: isLast ? 0 : 2.5, flex: 1 }}>
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
                          <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: "text.secondary" }}>
                            {s.code}
                          </Typography>
                          {done && !failHere && (
                            <Chip size="small" label="Completed" color="success" variant="outlined" sx={{ height: 18, fontSize: 10.5, fontWeight: 700 }} />
                          )}
                          {failHere && (
                            <Chip size="small" label="Unsuccessful" color="warning" sx={{ height: 18, fontSize: 10.5, fontWeight: 700 }} />
                          )}
                          {awaiting && (
                            <Chip size="small" label={s.awaitingLabel} color="warning" sx={{ height: 18, fontSize: 10.5, fontWeight: 700 }} />
                          )}
                          {onHold && (
                            <Chip size="small" label="On hold" variant="outlined" sx={{ height: 18, fontSize: 10.5, fontWeight: 700 }} />
                          )}
                        </Stack>
                        <Typography
                          sx={{
                            fontWeight: awaiting ? 800 : 700,
                            fontSize: 16,
                            color: state === "upcoming" || onHold ? "text.secondary" : "text.primary",
                          }}
                        >
                          {done ? completedLabelFor(i, outcome) : s.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.55, mt: 0.25 }}>
                          {done ? completedDescFor(i, outcome) : s.awaitingDesc}
                        </Typography>
                        {done && result.history[i] && (
                          <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5, fontWeight: 600 }}>
                            Completed on: {fmtDate(result.history[i])}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  );
                })}
              </Stack>

              {failed && (
                <Alert severity="warning" sx={{ mb: 2.5, borderRadius: 3 }}>
                  Depending on your service package, we may be able to prepare and submit a
                  revised endorsement application. Please contact your caseworker to discuss
                  your options.
                </Alert>
              )}

              <Divider sx={{ mb: 2 }} />
              <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2.5 }}>
                <Typography sx={{ fontSize: 14, color: "text.secondary" }}>Last updated</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 700 }}>{fmtDate(result.caseUpdatedAt)}</Typography>
              </Stack>

              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<SupportAgentRoundedIcon />}
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Case ${result.trackingRef}`)}`}
              >
                Email us about this case
              </Button>
            </>
          )}
        </Paper>

        <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 14, mt: 2.5 }}>
          Your tracking number is in your engagement confirmation email. Can&apos;t find it?
          Contact {SUPPORT_EMAIL}.
        </Typography>
      </Container>
    </Box>
  );
}
