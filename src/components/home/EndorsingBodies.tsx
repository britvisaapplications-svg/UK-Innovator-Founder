"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/** The Endorsing Body's own assessment pipeline. */
const PIPELINE: { icon: SvgIconComponent; label: string; note?: string }[] = [
  { icon: SendRoundedIcon, label: "Submitted" },
  { icon: FactCheckRoundedIcon, label: "Review & due diligence" },
  { icon: RecordVoiceOverRoundedIcon, label: "Interview", note: "where required" },
  { icon: InfoRoundedIcon, label: "Further information" },
  { icon: GavelRoundedIcon, label: "Decision" },
];

/** Fees and timings, read at a glance. */
const FACTS: { icon: SvgIconComponent; value: string; label: string }[] = [
  { icon: HourglassBottomRoundedIcon, value: "4-8 wks", label: "Indicative assessment time" },
  { icon: AccountBalanceRoundedIcon, value: "£1,000", label: "Initial fee, per person" },
  { icon: EventRepeatRoundedIcon, value: "£500", label: "Per contact-point meeting" },
  { icon: TimerRoundedIcon, value: "3 months", label: "Window to use your endorsement" },
];

/** Approved bodies, shown as monogram badges until logos are supplied. */
const BODIES = [
  { mono: "UKES", name: "UK Endorsing Services" },
  { mono: "II", name: "Innovator International" },
  { mono: "EL", name: "Envestors Limited" },
  { mono: "GEP", name: "Global Entrepreneurs Programme", note: "Invitation only" },
];

/**
 * §9 + §10, the Endorsing Body's assessment: a horizontal pipeline with
 * icon nodes, fee and timing tiles, and monogram badges for the four
 * approved bodies. Fee figures carry the message, so the prose is minimal.
 */
export default function EndorsingBodies() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="Endorsing Body assessment"
          title="What happens after submission"
          subtitle="Assessed independently. Their fees are always separate from ours."
        />

        {/* Assessment pipeline: icon nodes on a connecting rail */}
        <Reveal>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: `repeat(${PIPELINE.length}, 1fr)` },
              gap: { xs: 2, md: 0 },
              position: "relative",
              mb: { xs: 4, md: 5 },
            }}
          >
            {/* Rail behind the nodes (desktop only) */}
            <Box
              aria-hidden
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: 27,
                left: `${100 / PIPELINE.length / 2}%`,
                right: `${100 / PIPELINE.length / 2}%`,
                height: 2,
                background: "linear-gradient(90deg, rgba(214,31,48,0.25), rgba(214,31,48,0.9))",
              }}
            />
            {PIPELINE.map((p, i) => {
              const isLast = i === PIPELINE.length - 1;
              return (
                <Stack key={p.label} sx={{ alignItems: "center", textAlign: "center", position: "relative", px: 1 }}>
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      mb: 1.25,
                      bgcolor: isLast ? "primary.main" : "#fff",
                      color: isLast ? "#fff" : "primary.main",
                      border: "2px solid",
                      borderColor: "primary.main",
                      boxShadow: isLast ? "0 0 0 6px rgba(214,31,48,0.14)" : "none",
                    }}
                  >
                    <p.icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>
                    {p.label}
                  </Typography>
                  {p.note && (
                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.25 }}>
                      {p.note}
                    </Typography>
                  )}
                </Stack>
              );
            })}
          </Box>
        </Reveal>

        {/* Fees and timings */}
        <Grid container spacing={2}>
          {FACTS.map((f, i) => (
            <Grid key={f.label} size={{ xs: 6, md: 3 }}>
              <Reveal delay={i * 80} sx={{ height: "100%" }}>
                <Paper
                  className="lift-card"
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    height: "100%",
                    textAlign: "center",
                    borderTop: "3px solid",
                    borderTopColor: "primary.main",
                  }}
                >
                  <f.icon sx={{ color: "primary.main", fontSize: 26, mb: 0.75 }} />
                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: { xs: 24, md: 28 },
                      lineHeight: 1.1,
                      color: "secondary.main",
                    }}
                  >
                    {f.value}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.75, lineHeight: 1.5 }}>
                    {f.label}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Approved bodies as monogram badges */}
        <Reveal delay={120}>
          <Box sx={{ mt: { xs: 4, md: 5 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}>
              <VerifiedRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
              <Typography
                sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}
              >
                Four approved Endorsing Bodies
              </Typography>
            </Stack>
            <Grid container spacing={1.5}>
              {BODIES.map((b) => (
                <Grid key={b.mono} size={{ xs: 6, md: 3 }}>
                  <Paper
                    className="lift-card"
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: b.mono.length > 2 ? 13 : 16,
                        letterSpacing: 0.3,
                      }}
                      aria-hidden
                    >
                      {b.mono}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>
                        {b.name}
                      </Typography>
                      {b.note && (
                        <Typography sx={{ fontSize: 12, color: "primary.main", fontWeight: 700, mt: 0.25 }}>
                          {b.note}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Typography
              sx={{ fontSize: 13, color: "text.secondary", textAlign: "center", mt: 2.5, maxWidth: 600, mx: "auto" }}
            >
              Endorsement decisions rest solely with the Endorsing Body. Timings are indicative
              and never guaranteed.
            </Typography>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
