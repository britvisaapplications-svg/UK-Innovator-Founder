"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import Reveal from "@/components/Reveal";
import FlowStrip from "@/components/home/FlowStrip";
import { useLeadFormCta } from "@/lib/leadFormCta";

/** §17, Final conversion section on ink, closing the loop back to the form. */
export default function FinalCta() {
  const goToForm = useLeadFormCta();
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "secondary.main" }}>
      <Container sx={{ textAlign: "center" }}>
        <Reveal>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 40 }, color: "#fff", maxWidth: 700, mx: "auto" }}>
            Your Business Idea Could Start With Your CV
          </Typography>
          <Typography
            sx={{ mt: 2, color: "rgba(255,255,255,0.7)", maxWidth: 620, mx: "auto", lineHeight: 1.7 }}
          >
            Send us your CV and, where appropriate, we can suggest up to 2-3 innovative business
            ideas based on your profile.
          </Typography>
        </Reveal>
        <Reveal delay={100} sx={{ my: 4 }}>
          <FlowStrip
            onDark
            items={[
              "CV",
              "Business Idea",
              "Business Development",
              "Endorsement",
              "Visa",
              "Business Growth",
              "Potential ILR After 3 Years",
            ]}
          />
        </Reveal>
        <Reveal delay={180}>
          <Button
            component={Link}
            href="/#free-cv-check"
            onClick={goToForm}
            variant="contained"
            size="large"
            endIcon={<ArrowUpwardRoundedIcon />}
            sx={{ px: 4 }}
          >
            GET YOUR FREE CV CHECK
          </Button>
        </Reveal>
      </Container>
    </Box>
  );
}
