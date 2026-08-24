"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CakeRoundedIcon from "@mui/icons-material/CakeRounded";
import FiberNewRoundedIcon from "@mui/icons-material/FiberNewRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/** The four tests every proposition is assessed against. */
const PILLARS: {
  word: string;
  icon: SvgIconComponent;
  color: string;
  tint: string;
  desc: string;
}[] = [
  {
    word: "New",
    icon: FiberNewRoundedIcon,
    color: "#a01523",
    tint: "#fbeaec",
    desc: "A qualifying new business, not one already trading.",
  },
  {
    word: "Innovative",
    icon: AutoAwesomeRoundedIcon,
    color: "#9a5200",
    tint: "#fdf0e3",
    desc: "An original proposition with a real competitive advantage.",
  },
  {
    word: "Viable",
    icon: WorkspacePremiumRoundedIcon,
    color: "#1c6e43",
    tint: "#e2f5ec",
    desc: "A realistic plan, backed by your skills and resources.",
  },
  {
    word: "Scalable",
    icon: TrendingUpRoundedIcon,
    color: "#2b4c9b",
    tint: "#e7edfb",
    desc: "Structured growth, job creation and room to expand.",
  },
];

/** Applicant-side requirements, as compact chips rather than a list. */
const APPLICANT_REQS: { icon: SvgIconComponent; label: string }[] = [
  { icon: CakeRoundedIcon, label: "Aged 18 or over" },
  { icon: RecordVoiceOverRoundedIcon, label: "English language" },
  { icon: SavingsRoundedIcon, label: "Maintenance funds, where applicable" },
  { icon: VerifiedRoundedIcon, label: "Endorsement" },
  { icon: GavelRoundedIcon, label: "Wider Immigration Rules" },
];

/**
 * §6, Eligibility: the four business tests as numbered, colour-coded cards
 * with icons and a ghost numeral, over a chip row for the applicant-side
 * requirements. One short line per card carries each test.
 */
export default function Eligibility() {
  return (
    <Box id="eligibility" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Eligibility"
          title="Four tests your business must pass"
          subtitle="Endorsing Bodies assess every proposition against the same four pillars."
        />

        <Grid container spacing={2}>
          {PILLARS.map((p, i) => (
            <Grid key={p.word} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 90} sx={{ height: "100%" }}>
                <Paper
                  className="lift-card"
                  sx={{
                    p: 2.5,
                    borderRadius: 5,
                    height: "100%",
                    bgcolor: p.tint,
                    border: "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Ghost numeral. A plain Box, not Typography: the theme's
                      responsive body1 media queries would override an sx
                      fontSize on a Typography. */}
                  <Box
                    aria-hidden
                    component="span"
                    sx={{
                      position: "absolute",
                      top: -14,
                      right: 12,
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: 88,
                      lineHeight: 1,
                      color: p.color,
                      opacity: 0.16,
                      pointerEvents: "none",
                    }}
                  >
                    {i + 1}
                  </Box>

                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: "#fff",
                      mb: 1.75,
                    }}
                  >
                    <p.icon sx={{ color: p.color, fontSize: 26 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 800,
                      color: p.color,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      mb: 0.75,
                    }}
                  >
                    {p.word}
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, lineHeight: 1.55, color: "text.primary", position: "relative" }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Applicant-side requirements */}
        <Reveal delay={150}>
          <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
            <Typography
              sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary", mb: 1.75 }}
            >
              You will also need
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {APPLICANT_REQS.map((r) => (
                <Chip
                  key={r.label}
                  icon={<r.icon sx={{ fontSize: 17 }} />}
                  label={r.label}
                  sx={{
                    height: 36,
                    fontSize: 14,
                    fontWeight: 600,
                    bgcolor: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    "& .MuiChip-icon": { color: "primary.main" },
                  }}
                />
              ))}
            </Stack>
          </Paper>
        </Reveal>
      </Container>
    </Box>
  );
}
