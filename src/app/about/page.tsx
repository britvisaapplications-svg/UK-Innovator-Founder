import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import RouteRoundedIcon from "@mui/icons-material/RouteRounded";
import PageHero from "@/components/PageHero";
import FeatureCards, { StatTiles } from "@/components/FeatureCards";
import FlowStrip from "@/components/home/FlowStrip";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "About Us" };

const WHAT_WE_DO = [
  {
    icon: LightbulbRoundedIcon,
    title: "Ideas from your CV",
    desc: "No business idea? We suggest up to 2-3 matched to your experience.",
  },
  {
    icon: RouteRoundedIcon,
    title: "End-to-end delivery",
    desc: "Business plan, financials, validation, endorsement and visa application.",
  },
  {
    icon: GavelRoundedIcon,
    title: "IAA-regulated",
    desc: "Immigration work handled and supervised by regulated lawyers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        icon={ApartmentRoundedIcon}
        eyebrow="About us"
        title="We turn strong profiles into endorsable UK businesses"
        intro="Most advisers wait for you to bring an idea. We start from your CV."
      />

      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack spacing={{ xs: 4, md: 6 }}>
          <Reveal>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4 }}>
              <FlowStrip
                items={[
                  "Your CV",
                  "Experience & Skills",
                  "Business Idea",
                  "Development",
                  "Endorsement",
                  "Visa",
                ]}
                highlightLast
              />
            </Paper>
          </Reveal>

          <FeatureCards items={WHAT_WE_DO} />

          <StatTiles
            items={[
              { value: "2-3", label: "Business ideas suggested from your profile" },
              { value: "7", label: "Tracked stages from CV to endorsement decision" },
              { value: "4 weeks", label: "Preparation roadmap before submission" },
              { value: "3 years", label: "Potential route to ILR, subject to requirements" },
            ]}
          />

          <Reveal>
            <Box sx={{ textAlign: "center" }}>
              <Button href="/#free-cv-check" variant="contained" size="large" sx={{ px: 4 }}>
                Get your free CV check
              </Button>
              <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 1.5 }}>
                Free initial review · No obligation
              </Typography>
            </Box>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}
