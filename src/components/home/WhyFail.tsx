"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const PAIRS = [
  {
    fail: "The idea is not genuinely innovative",
    avoid:
      "Demonstrate a real market problem, an original solution and a meaningful competitive advantage.",
  },
  {
    fail: "The founder cannot explain the innovation",
    avoid: "The founder must understand and genuinely contribute to the proposition.",
  },
  {
    fail: "Weak connection between founder and business",
    avoid:
      "Align the concept with the founder's background, or explain how any missing capability will be secured.",
  },
  {
    fail: "Weak market research",
    avoid:
      "Use credible research, competitor analysis, surveys, LOIs, testing or pilot evidence where appropriate.",
  },
  {
    fail: "Unrealistic financial forecasts",
    avoid:
      "Use defensible assumptions for pricing, costs, customer acquisition, revenue and growth.",
  },
  {
    fail: "Weak scalability",
    avoid: "Show realistic job creation, operational scaling and national/international expansion.",
  },
  {
    fail: "Poor interview preparation",
    avoid: "Prepare for detailed questions on innovation, finances, competition and implementation.",
  },
  {
    fail: "Business plan and interview answers do not match",
    avoid:
      "Stay actively involved in development so written and verbal evidence remain consistent.",
  },
];

/** §11, Why candidates fail endorsement, and how we help avoid each trap. */
export default function WhyFail() {
  return (
    <Box id="why-applications-fail" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container sx={{ maxWidth: "900px !important" }}>
        <SectionHeading
          eyebrow="Why applications fail"
          title="Eight reasons endorsements fail, and how to avoid them"
          subtitle="Most refusals trace back to the same avoidable weaknesses. Our process is designed to close each one before submission."
        />
        <Stack spacing={1.25}>
          {PAIRS.map((p, i) => (
            <Reveal key={p.fail} delay={i * 40}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                    <CancelRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: 15.5 }}>{p.fail}</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Stack
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: "flex-start", bgcolor: "#e2f5ec", borderRadius: 2.5, p: 1.75 }}
                  >
                    <ShieldRoundedIcon sx={{ color: "#1c6e43", fontSize: 20, mt: 0.25 }} />
                    <Typography sx={{ fontSize: 14.5, lineHeight: 1.65 }}>
                      <Box component="span" sx={{ fontWeight: 800, color: "#1c6e43" }}>
                        How to avoid:{" "}
                      </Box>
                      {p.avoid}
                    </Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
