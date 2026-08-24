"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const STAGE_1 = [
  "Idea",
  "Development",
  "Business Plan",
  "Market Research",
  "Financial Model",
  "Validation",
  "Endorsement Application",
  "Interview / Pitch",
  "Decision",
];

const STAGE_2 = ["Endorsement Letter", "Visa Documents", "Home Office Application", "Decision"];

/**
 * §4, What is the Innovator Founder Visa? Two stage panels side by side:
 * Stage 1 on white (the work we do with you), Stage 2 on ink (the
 * destination). Each step is a numbered node on a connected rail, so the
 * route reads as a diagram rather than a paragraph.
 */
function StageRail({
  steps,
  onDark = false,
  /** Number of the first step, so a split column continues 6, 7, 8… */
  startAt = 1,
  /** Fill the final node only on the column that ends the stage. */
  markFinal = true,
}: {
  steps: string[];
  onDark?: boolean;
  startAt?: number;
  markFinal?: boolean;
}) {
  return (
    <Stack spacing={0}>
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        const isFinal = isLast && markFinal;
        return (
          <Stack key={s} direction="row" spacing={1.5} sx={{ alignItems: "stretch" }}>
            <Stack sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: isFinal ? "#fff" : onDark ? "#f0808d" : "primary.main",
                  bgcolor: isFinal ? "primary.main" : onDark ? "rgba(255,255,255,0.10)" : "#fbeaec",
                }}
              >
                {startAt + i}
              </Box>
              {!isLast && (
                <Box
                  sx={{
                    width: 2,
                    flex: 1,
                    minHeight: 14,
                    my: 0.4,
                    bgcolor: onDark ? "rgba(255,255,255,0.16)" : "rgba(214,31,48,0.20)",
                  }}
                />
              )}
            </Stack>
            <Typography
              sx={{
                pb: isLast ? 0 : 1.4,
                pt: 0.35,
                fontSize: 14.5,
                fontWeight: isFinal ? 700 : 600,
                color: onDark ? (isFinal ? "#fff" : "rgba(255,255,255,0.78)") : "text.primary",
              }}
            >
              {s}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default function WhatIsIt() {
  return (
    <Box id="what-is-it" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="What is it?"
          title="Two stages: get endorsed, then apply"
          subtitle="A UK route for founders building an innovative, viable and scalable business. No employer sponsor, but your proposition must be endorsed."
        />

        <Grid container spacing={{ xs: 2.5, md: 3 }} sx={{ alignItems: "stretch" }}>
          {/* Stage 1 */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex" }}>
            <Reveal sx={{ width: "100%", display: "flex" }}>
              <Paper
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 5,
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Ghost stage number */}
                <Box
                  aria-hidden
                  component="span"
                  sx={{
                    position: "absolute",
                    top: -18,
                    right: 10,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 130,
                    lineHeight: 1,
                    color: "rgba(214,31,48,0.07)",
                    pointerEvents: "none",
                  }}
                >
                  01
                </Box>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: "#fbeaec",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <VerifiedRoundedIcon sx={{ color: "primary.main", fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "primary.main" }}
                    >
                      Stage 1
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: 19, lineHeight: 1.2 }}>
                      Endorsement
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 3 }}>
                  <StageRail steps={STAGE_1.slice(0, 5)} markFinal={false} />
                  <StageRail steps={STAGE_1.slice(5)} startAt={6} />
                </Box>
              </Paper>
            </Reveal>
          </Grid>

          {/* Stage 2, on ink: the destination */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: "flex" }}>
            <Reveal delay={120} sx={{ width: "100%", display: "flex" }}>
              <Paper
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: 5,
                  width: "100%",
                  position: "relative",
                  overflow: "hidden",
                  bgcolor: "secondary.main",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  aria-hidden
                  component="span"
                  sx={{
                    position: "absolute",
                    top: -18,
                    right: 10,
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 130,
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.06)",
                    pointerEvents: "none",
                  }}
                >
                  02
                </Box>

                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: "rgba(255,255,255,0.08)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <FlagRoundedIcon sx={{ color: "#f0808d", fontSize: 24 }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#f0808d" }}
                    >
                      Stage 2
                    </Typography>
                    <Typography variant="h6" sx={{ fontSize: 19, lineHeight: 1.2, color: "#fff" }}>
                      Visa application
                    </Typography>
                  </Box>
                </Stack>

                <StageRail steps={STAGE_2} onDark />

                <Box sx={{ flex: 1 }} />
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    mt: 3,
                    pt: 2,
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  <ArrowForwardRoundedIcon sx={{ fontSize: 17, color: "#f0808d" }} />
                  <Typography sx={{ fontSize: 13.5 }}>
                    Endorsement must be used within 3 months
                  </Typography>
                </Stack>
              </Paper>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
