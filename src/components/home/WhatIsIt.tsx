"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import FlowStrip from "@/components/home/FlowStrip";

/** §4, What is the Innovator Founder Visa? Two clear stages. */
export default function WhatIsIt() {
  return (
    <Box id="what-is-it" component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff", scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="What is it?"
          title="What is the Innovator Founder Visa?"
          subtitle="A UK immigration route for entrepreneurs seeking to establish and develop an innovative, viable and scalable business in the UK. An employer sponsor is not required; instead, your business proposition must receive endorsement from an approved Endorsing Body."
        />
        <Stack spacing={2.5}>
          <Reveal>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4 }}>
              <Typography
                sx={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "primary.main", mb: 0.5 }}
              >
                Stage 1: Endorsement
              </Typography>
              <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 2 }}>
                Develop and validate the business proposition, then present it to an Endorsing Body.
              </Typography>
              <FlowStrip
                items={[
                  "Idea",
                  "Development",
                  "Business Plan",
                  "Market Research",
                  "Financial Model",
                  "Validation",
                  "Endorsement Application",
                  "Interview / Pitch",
                  "Decision",
                ]}
              />
            </Paper>
          </Reveal>
          <Reveal delay={100}>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4 }}>
              <Typography
                sx={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "primary.main", mb: 0.5 }}
              >
                Stage 2: Visa application
              </Typography>
              <Typography sx={{ fontSize: 14, color: "text.secondary", mb: 2 }}>
                With endorsement granted, the formal application goes to the Home Office.
              </Typography>
              <FlowStrip
                items={["Endorsement Letter", "Visa Documents", "Home Office Application", "Decision"]}
                highlightLast
              />
            </Paper>
          </Reveal>
        </Stack>
      </Container>
    </Box>
  );
}
