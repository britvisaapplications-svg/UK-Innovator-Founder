import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FamilyRestroomRoundedIcon from "@mui/icons-material/FamilyRestroomRounded";
import FlightTakeoffRoundedIcon from "@mui/icons-material/FlightTakeoffRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import PageHero from "@/components/PageHero";
import FeatureCards from "@/components/FeatureCards";
import FlowStrip from "@/components/home/FlowStrip";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Visa Application Support" };

const INCLUDED = [
  {
    icon: DescriptionRoundedIcon,
    title: "Document bundle",
    desc: "Application preparation and the full supporting evidence pack.",
  },
  {
    icon: FamilyRestroomRoundedIcon,
    title: "Dependants",
    desc: "Partner and children applications where eligible.",
  },
  {
    icon: BadgeRoundedIcon,
    title: "Biometrics & follow-ups",
    desc: "Guidance through appointments and any Home Office requests.",
  },
];

const FEES = [
  { label: "Our professional fees", detail: "Agreed in writing, paid in stages" },
  { label: "Endorsing Body fees", detail: "Paid directly to the Endorsing Body" },
  { label: "Home Office fees", detail: "Application fee and health surcharge" },
];

export default function VisaApplicationSupportPage() {
  return (
    <>
      <PageHero
        icon={FlightTakeoffRoundedIcon}
        eyebrow="Stage 2"
        title="Visa application support"
        intro="From endorsement letter to Home Office decision, handled or supervised by IAA-regulated lawyers."
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

          <FeatureCards items={INCLUDED} />

          {/* Fee separation, a compliance requirement, shown as three columns. */}
          <Box>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.75 }}>
              <AccountBalanceRoundedIcon sx={{ color: "primary.main", fontSize: 20 }} />
              <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}>
                Three separate fees, never mixed
              </Typography>
            </Stack>
            <Grid container spacing={2}>
              {FEES.map((f, i) => (
                <Grid key={f.label} size={{ xs: 12, md: 4 }}>
                  <Reveal delay={i * 80} sx={{ height: "100%" }}>
                    <Paper
                      className="lift-card"
                      sx={{ p: 2.5, borderRadius: 4, height: "100%", borderTop: "3px solid", borderTopColor: "primary.main" }}
                    >
                      <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 0.5 }}>{f.label}</Typography>
                      <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.6 }}>
                        {f.detail}
                      </Typography>
                    </Paper>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Reveal>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start", bgcolor: "#fbeaec", borderRadius: 3, p: 2.5 }}
            >
              <GavelRoundedIcon sx={{ color: "primary.main", mt: 0.25 }} />
              <Typography sx={{ fontSize: 14.5, lineHeight: 1.65 }}>
                Visa decisions rest with the Home Office. We prepare and submit your
                application; outcomes are never guaranteed.
              </Typography>
            </Stack>
          </Reveal>

          <Reveal>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "center" }}>
              <Button href="/#free-cv-check" variant="contained" size="large" sx={{ px: 4 }}>
                Start with a free CV check
              </Button>
              <Button href="/already-have-endorsement" variant="outlined" color="secondary" size="large">
                Already endorsed?
              </Button>
            </Stack>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}
