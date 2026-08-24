import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import PageHero from "@/components/PageHero";
import FeatureCards from "@/components/FeatureCards";
import FlowStrip from "@/components/home/FlowStrip";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Already Have Endorsement?" };

const INCLUDED = [
  {
    icon: DescriptionRoundedIcon,
    title: "Application & documents",
    desc: "Form completion and the full supporting document bundle.",
  },
  {
    icon: FamilyRestroomRoundedIcon,
    title: "Dependants",
    desc: "Partner and children applications where eligible.",
  },
  {
    icon: GavelRoundedIcon,
    title: "Regulated handling",
    desc: "Prepared or supervised by IAA-regulated immigration lawyers.",
  },
];

export default function AlreadyHaveEndorsementPage() {
  return (
    <>
      <PageHero
        icon={VerifiedRoundedIcon}
        eyebrow="Already endorsed"
        title="Endorsed already? We take it from here"
        intro="From endorsement letter to submitted visa application, inside your 3-month window."
      />

      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Reveal>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: 4 }}>
              <FlowStrip
                items={["Endorsement Letter", "Visa Documents", "Home Office Application", "Decision"]}
                highlightLast
              />
            </Paper>
          </Reveal>

          <Reveal>
            <Paper
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: 4,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                gap: 3,
                borderLeft: "5px solid",
                borderLeftColor: "primary.main",
              }}
            >
              <Stack sx={{ alignItems: "center", minWidth: 150 }}>
                <TimerRoundedIcon sx={{ fontSize: 34, color: "primary.main", mb: 0.5 }} />
                <Typography
                  sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 30, color: "primary.main", lineHeight: 1 }}
                >
                  3 months
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: 16, lineHeight: 1.65, color: "text.secondary" }}>
                That is how long your endorsement stays valid for the visa application. Timing
                matters, so we prepare and submit inside that window.
              </Typography>
            </Paper>
          </Reveal>

          <FeatureCards items={INCLUDED} />

          <Reveal>
            <Box sx={{ textAlign: "center" }}>
              <Button href="/contact" variant="contained" size="large" sx={{ px: 4 }}>
                Talk to us about your endorsement
              </Button>
            </Box>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}
