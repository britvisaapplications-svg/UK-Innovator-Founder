"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import QueryStatsRoundedIcon from "@mui/icons-material/QueryStatsRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/**
 * Phases laid out on a 5-column week track, so bar width shows real
 * duration: `start` is the 1-based column, `span` the number of weeks.
 */
const PHASES: {
  week: string;
  title: string;
  desc: string;
  icon: SvgIconComponent;
  start: number;
  span: number;
}[] = [
  {
    week: "Before Week 1",
    title: "Foundations",
    desc: "CV review, profile assessment, idea selection",
    icon: DescriptionRoundedIcon,
    start: 1,
    span: 1,
  },
  {
    week: "Week 1",
    title: "Refine & research",
    desc: "Idea refinement and initial research",
    icon: TuneRoundedIcon,
    start: 2,
    span: 1,
  },
  {
    week: "Weeks 2-3",
    title: "Build the evidence",
    desc: "Business plan, financial model, market research, LOIs",
    icon: QueryStatsRoundedIcon,
    start: 3,
    span: 2,
  },
  {
    week: "Week 4",
    title: "Ready to submit",
    desc: "Final refinement, prepared for the Endorsing Body",
    icon: RocketLaunchRoundedIcon,
    start: 5,
    span: 1,
  },
];

const RULER = ["Before W1", "Week 1", "Week 2", "Week 3", "Week 4"];

/** §8, the 4-week preparation roadmap as a gantt-style track. */
export default function PrepTimeline() {
  return (
    <Box id="timeline" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Timeline"
          title="A focused 4-week preparation roadmap"
        />

        {/* Desktop: gantt track. Bar width equals real duration. */}
        <Reveal>
          <Paper sx={{ display: { xs: "none", md: "block" }, p: 3.5, borderRadius: 5 }}>
            {/* Week ruler */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 1,
                pb: 1.25,
                mb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              {RULER.map((w) => (
                <Typography
                  key={w}
                  sx={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    color: "text.secondary",
                    textAlign: "center",
                  }}
                >
                  {w}
                </Typography>
              ))}
            </Box>

            <Stack spacing={1.25}>
              {PHASES.map((p, i) => (
                <Box
                  key={p.title}
                  sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1 }}
                >
                  <Box
                    className="lift-card"
                    sx={{
                      gridColumn: `${p.start} / span ${p.span}`,
                      borderRadius: 3,
                      p: 2,
                      color: "#fff",
                      background: `linear-gradient(135deg, rgba(214,31,48,${0.72 + i * 0.09}), rgba(179,22,42,${0.82 + i * 0.06}))`,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.25,
                      minHeight: 62,
                    }}
                  >
                    <Box
                      sx={{
                        width: 34,
                        height: 34,
                        borderRadius: 2,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "rgba(255,255,255,0.18)",
                      }}
                    >
                      <p.icon sx={{ fontSize: 19 }} />
                    </Box>
                    {/* Title only: a one-week bar is too narrow for prose. */}
                    <Typography sx={{ fontWeight: 700, fontSize: 15, lineHeight: 1.25, minWidth: 0 }}>
                      {p.title}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Reveal>

        {/* Mobile: the same phases as stacked cards. */}
        <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" } }}>
          {PHASES.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Paper sx={{ p: 2.25, borderRadius: 4, borderLeft: "4px solid", borderLeftColor: "primary.main" }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#fbeaec",
                    }}
                  >
                    <p.icon sx={{ fontSize: 21, color: "primary.main" }} />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: 11.5,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "primary.main",
                      }}
                    >
                      {p.week}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.3 }}>
                      {p.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5 }}>
                      {p.desc}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Reveal>
          ))}
        </Stack>

        <Reveal delay={150}>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "center", justifyContent: "center", mt: 2.5 }}
          >
            <InfoRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", textAlign: "center" }}>
              Preparation time only. The Endorsing Body&apos;s decision time is separate and
              never guaranteed.
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
