"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const PILLARS = [
  {
    word: "New",
    color: "#d61f30",
    tint: "#fbeaec",
    desc: "A qualifying new business, not simply joining a business that is already trading.",
  },
  {
    word: "Innovative",
    color: "#9a5200",
    tint: "#fdf0e3",
    desc: "An original proposition that meets a market need or creates a meaningful competitive advantage.",
  },
  {
    word: "Viable",
    color: "#1c6e43",
    tint: "#e2f5ec",
    desc: "A realistic and achievable plan based on your skills, experience, resources and market understanding.",
  },
  {
    word: "Scalable",
    color: "#2b4c9b",
    tint: "#e7edfb",
    desc: "Structured growth planning: job creation and expansion into national and international markets.",
  },
];

const APPLICANT_REQS = [
  "Aged 18 or over at the date of application",
  "English language ability at the required level",
  "Maintenance funds, where applicable",
  "Endorsement of your business by an approved Endorsing Body",
  "Meeting the wider requirements of the Immigration Rules",
];

/** §6, Eligibility: the four business pillars plus applicant-side requirements. */
export default function Eligibility() {
  return (
    <Box id="eligibility" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Eligibility"
          title="Four tests your business must pass"
          subtitle="Endorsing Bodies assess every proposition against the same four pillars. Our development work is built around evidencing each one."
        />
        <Grid container spacing={2}>
          {PILLARS.map((p, i) => (
            <Grid key={p.word} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 90} sx={{ height: "100%" }}>
                <Paper
                  className="lift-card"
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    height: "100%",
                    bgcolor: p.tint,
                    border: "none",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontSize: 24,
                      fontWeight: 800,
                      color: p.color,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      mb: 1,
                    }}
                  >
                    {p.word}
                  </Typography>
                  <Typography sx={{ fontSize: 14.5, lineHeight: 1.6, color: "text.primary" }}>
                    {p.desc}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal delay={150}>
          <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2.5, md: 3 }, borderRadius: 4 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 1.5 }}>
              You will also need to meet applicant-side requirements
            </Typography>
            <Grid container spacing={1}>
              {APPLICANT_REQS.map((r) => (
                <Grid key={r} size={{ xs: 12, md: 6 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                    <CheckCircleRoundedIcon sx={{ fontSize: 19, color: "success.main", mt: 0.25 }} />
                    <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.6 }}>
                      {r}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 1.5 }}>
              We confirm exactly which requirements apply to you during your free profile assessment.
            </Typography>
          </Paper>
        </Reveal>
      </Container>
    </Box>
  );
}
