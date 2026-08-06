"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import Stack from "@mui/material/Stack";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import StepLadder from "@/components/home/StepLadder";
import FlowStrip from "@/components/home/FlowStrip";

const TIMELINE = [
  { title: "Visa granted", desc: "Your Innovator Founder journey in the UK begins." },
  { title: "Months 1-12", desc: "Develop and grow the business." },
  { title: "~Month 12", desc: "First mandatory contact-point meeting with your Endorsing Body." },
  { title: "Months 12-24", desc: "Continue development and scaling." },
  { title: "~Month 24", desc: "Second mandatory contact-point meeting." },
  { title: "Year 3", desc: "Settlement / ILR assessment, subject to requirements." },
];

/** §14 + §15, After the visa is granted, and the potential ILR route. */
export default function AfterVisa() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="After the visa"
          title="The three-year journey to potential ILR"
          subtitle="The route can potentially lead to Indefinite Leave to Remain after three qualifying years, provided the applicable residence, endorsement and business-achievement requirements are met."
        />
        <StepLadder steps={TIMELINE} climb={12} />

        <Reveal delay={120}>
          <Paper
            sx={{
              mt: { xs: 4, md: 6 },
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              bgcolor: "secondary.main",
              color: "#fff",
            }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}>
              <WorkspacePremiumRoundedIcon sx={{ color: "#f0808d" }} />
              <Typography sx={{ fontWeight: 800, fontSize: 16, textAlign: "center" }}>
                Premium clients are supported at every step of the three-year route
              </Typography>
            </Stack>
            <FlowStrip
              onDark
              items={[
                "Initial Idea",
                "Initial Endorsement",
                "Visa",
                "12-Month Meeting Support",
                "24-Month Meeting Support",
                "Preparation Towards ILR Stage",
              ]}
            />
          </Paper>
        </Reveal>
      </Container>
    </Box>
  );
}
