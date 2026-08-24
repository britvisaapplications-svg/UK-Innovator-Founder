"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/** Each refusal reason paired with its remedy, both kept to one short line. */
const PAIRS: { fail: string; fix: string }[] = [
  {
    fail: "The idea is not genuinely innovative",
    fix: "A real market problem, an original solution, a clear advantage.",
  },
  {
    fail: "The founder cannot explain the innovation",
    fix: "You stay involved, so the idea is genuinely yours to defend.",
  },
  {
    fail: "Weak link between founder and business",
    fix: "The concept is built around your background and track record.",
  },
  {
    fail: "Weak market research",
    fix: "Competitor analysis, surveys, LOIs and pilot evidence.",
  },
  {
    fail: "Unrealistic financial forecasts",
    fix: "Defensible pricing, costs, acquisition and growth assumptions.",
  },
  {
    fail: "Weak scalability",
    fix: "Realistic job creation, operational scaling and expansion.",
  },
  {
    fail: "Poor interview preparation",
    fix: "Rehearsal on innovation, finance, competition and delivery.",
  },
  {
    fail: "Plan and interview answers do not match",
    fix: "One consistent story across written and verbal evidence.",
  },
];

/**
 * §11, why endorsements fail.
 *
 * Presented as an assessor's findings sheet: one framed ledger with an ink
 * header, hairline-separated rows, and each refusal reason facing the
 * remedy. No per-item cards and no numbering, because these are a set of
 * risks rather than a sequence. A crimson rule marks the row on hover.
 */
export default function WhyFail() {
  return (
    <Box id="why-applications-fail" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container sx={{ maxWidth: "1000px !important" }}>
        <SectionHeading
          eyebrow="Why applications fail"
          title="Eight reasons endorsements fail, and how to avoid them"
          subtitle="Most refusals trace back to the same avoidable weaknesses."
        />

        <Reveal>
          <Paper sx={{ borderRadius: 2.5, overflow: "hidden" }}>
            {/* Column headers */}
            <Box
              sx={{
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: "1fr 1fr",
                bgcolor: "secondary.main",
                px: 3,
                py: 1.75,
                columnGap: 4,
              }}
            >
              <Typography
                sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", color: "#f0808d" }}
              >
                Where applications fail
              </Typography>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.75)",
                  borderLeft: "1px solid rgba(255,255,255,0.15)",
                  pl: 3,
                }}
              >
                How we prevent it
              </Typography>
            </Box>

            {PAIRS.map((p, i) => (
              <Box
                key={p.fail}
                sx={{
                  position: "relative",
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  columnGap: 4,
                  rowGap: 0.75,
                  px: { xs: 2.5, md: 3 },
                  py: { xs: 2, md: 2.25 },
                  borderTop: i === 0 ? "none" : "1px solid",
                  borderColor: "divider",
                  transition: "background-color .18s ease",
                  "&:hover": { bgcolor: "rgba(214,31,48,0.035)" },
                  // Crimson rule that fills in on hover.
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    bgcolor: "primary.main",
                    transform: "scaleY(0)",
                    transformOrigin: "center",
                    transition: "transform .22s ease",
                  },
                  "&:hover::before": { transform: "scaleY(1)" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 15.5, md: 16 },
                    fontWeight: 600,
                    color: "secondary.main",
                    lineHeight: 1.45,
                  }}
                >
                  {p.fail}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{
                    alignItems: "flex-start",
                    borderLeft: { md: "1px solid" },
                    borderColor: { md: "divider" },
                    pl: { md: 3 },
                  }}
                >
                  <CheckRoundedIcon sx={{ fontSize: 19, color: "#1c6e43", mt: 0.2, flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 15, color: "text.secondary", lineHeight: 1.5 }}>
                    {p.fix}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Paper>
        </Reveal>
      </Container>
    </Box>
  );
}
