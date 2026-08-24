import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import SolarPowerRoundedIcon from "@mui/icons-material/SolarPowerRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Approved Cases" };

/** Sectors we develop propositions in. Anonymised case studies to follow. */
const SECTORS = [
  { icon: MemoryRoundedIcon, label: "Technology & SaaS" },
  { icon: BiotechRoundedIcon, label: "Health & life sciences" },
  { icon: SolarPowerRoundedIcon, label: "Clean energy" },
  { icon: LocalShippingRoundedIcon, label: "Logistics & supply chain" },
  { icon: StorefrontRoundedIcon, label: "Retail & marketplaces" },
  { icon: RestaurantRoundedIcon, label: "Food & hospitality" },
];

export default function ApprovedCasesPage() {
  return (
    <>
      <PageHero
        icon={WorkspacePremiumRoundedIcon}
        eyebrow="Approved cases"
        title="Case studies, coming soon"
        intro="We are preparing anonymised examples of the endorsements and visas our clients have secured."
      />

      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack spacing={{ xs: 4, md: 5 }}>
          <Box>
            <Typography
              sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary", mb: 2 }}
            >
              Sectors we develop propositions in
            </Typography>
            <Grid container spacing={2}>
              {SECTORS.map((s, i) => (
                <Grid key={s.label} size={{ xs: 6, sm: 4, md: 2 }}>
                  <Reveal delay={(i % 6) * 70} sx={{ height: "100%" }}>
                    <Paper
                      className="lift-card"
                      sx={{ p: 2, borderRadius: 4, height: "100%", textAlign: "center" }}
                    >
                      <s.icon sx={{ color: "primary.main", fontSize: 28, mb: 1 }} />
                      <Typography sx={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.4 }}>
                        {s.label}
                      </Typography>
                    </Paper>
                  </Reveal>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Reveal>
            <Paper
              variant="outlined"
              sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, textAlign: "center", borderStyle: "dashed" }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: 17, mb: 1 }}>
                Anonymised case studies are being prepared
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 15, lineHeight: 1.65, maxWidth: 560, mx: "auto" }}>
                Each will cover the founder&apos;s background, the idea developed, the package
                used and the outcome. Past outcomes are examples only, never a promise of
                future results.
              </Typography>
            </Paper>
          </Reveal>

          <Reveal>
            <Box sx={{ textAlign: "center" }}>
              <Button href="/#free-cv-check" variant="contained" size="large" sx={{ px: 4 }}>
                Get your free CV check
              </Button>
            </Box>
          </Reveal>
        </Stack>
      </Container>
    </>
  );
}
