"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import FlowStrip from "@/components/home/FlowStrip";
import { IAA_NOTE } from "@/lib/site";

/** §12, Why our approach is different: idea generation starts from the CV. */
export default function WhyDifferent() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="Why we're different"
          title="You don't need a business idea to start"
          subtitle="Most advisers wait for you to bring an idea. We start from your CV: your experience and skills are the raw material for a credible, endorsable proposition."
        />
        <Reveal>
          <Paper
            variant="outlined"
            sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4, mb: 3 }}
          >
            <FlowStrip
              items={[
                "Your CV",
                "Experience & Skills",
                "Up to 2-3 Business Ideas",
                "Chosen Idea",
                "Bespoke Development",
                "Endorsement Preparation",
              ]}
              highlightLast
            />
          </Paper>
        </Reveal>
        <Reveal delay={100}>
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              alignItems: "flex-start",
              bgcolor: "#fbeaec",
              borderRadius: 3,
              p: { xs: 2, md: 2.5 },
              maxWidth: 720,
              mx: "auto",
            }}
          >
            <GavelRoundedIcon sx={{ color: "primary.main", mt: 0.25 }} />
            <Typography sx={{ fontSize: 14.5, lineHeight: 1.65 }}>{IAA_NOTE}</Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
