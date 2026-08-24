"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SectionHeading from "@/components/home/SectionHeading";
import StepLadder from "@/components/home/StepLadder";

const STEPS = [
  { title: "Free CV Check" },
  { title: "Profile Assessment" },
  { title: "Up to 2-3 Innovative Business Ideas" },
  { title: "Business Development" },
  { title: "Endorsement Application" },
  { title: "Endorsement Granted" },
  { title: "Visa Application" },
  { title: "Grow UK Business" },
  { title: "Potential ILR After 3 Years" },
];

/** §3, Quick journey overview: the whole route in one climbing strip. */
export default function JourneyOverview() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 } }}>
      <Container>
        <SectionHeading
          eyebrow="Your journey"
          title="From CV to UK founder in nine steps"
          subtitle="From your first CV review to potential settlement, we stay with you."
        />
        <StepLadder steps={STEPS} />
      </Container>
    </Box>
  );
}
