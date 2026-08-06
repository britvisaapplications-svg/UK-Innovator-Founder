"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const PHASES = [
  {
    label: "Before Week 1",
    title: "Foundations",
    desc: "CV review → profile assessment → 2-3 business ideas where required → idea selection.",
  },
  {
    label: "Week 1",
    title: "Refine & research",
    desc: "Idea refinement and initial research.",
  },
  {
    label: "Weeks 2-3",
    title: "Build the evidence",
    desc: "Business plan, market research, financial model, survey work and LOIs where applicable.",
  },
  {
    label: "Week 4",
    title: "Ready to submit",
    desc: "Discussion, refinement and preparation for Endorsing Body submission.",
  },
];

/** §8, The 4-week preparation timeline, with its non-negotiable disclaimer. */
export default function PrepTimeline() {
  return (
    <Box id="timeline" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Timeline"
          title="A focused 4-week preparation roadmap"
        />
        <Grid container spacing={2}>
          {PHASES.map((p, i) => (
            <Grid key={p.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 90} sx={{ height: "100%" }}>
                <Paper className="lift-card" sx={{ p: 2.5, borderRadius: 4, height: "100%", borderTop: "3px solid", borderTopColor: "primary.main" }}>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 13,
                      fontWeight: 800,
                      color: "primary.main",
                      mb: 1,
                    }}
                  >
                    {p.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: 16.5, mb: 0.5 }}>{p.title}</Typography>
                  <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.6 }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>
        <Reveal delay={150}>
          <Alert severity="info" sx={{ mt: 3, borderRadius: 3 }}>
            <strong>Important:</strong> the four-week period is our preparation roadmap only.
            The Endorsing Body&apos;s decision time is separate and is not guaranteed.
          </Alert>
        </Reveal>
      </Container>
    </Box>
  );
}
