import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { OFFICE, SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us" };

const CHANNELS = [
  {
    icon: EmailRoundedIcon,
    label: "Email",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: OFFICE.phoneDisplay,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: CallRoundedIcon,
    label: "Phone",
    value: OFFICE.phoneDisplay,
    href: `tel:${WHATSAPP_NUMBER}`,
  },
  {
    icon: LocationOnRoundedIcon,
    label: "Office",
    value: "291 Slade Lane, Manchester M19 2HR",
    href: "/our-office",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        icon={SupportAgentRoundedIcon}
        eyebrow="Contact us"
        title="Talk to us about your UK business"
        intro="The fastest start is the free CV & profile check. Or reach us directly, Monday to Friday, 9:00am to 5:30pm."
      />

      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={2}>
          {CHANNELS.map((c, i) => (
            <Grid key={c.label} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 80} sx={{ height: "100%" }}>
                <Paper
                  component="a"
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener" : undefined}
                  className="lift-card"
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    height: "100%",
                    display: "block",
                    textDecoration: "none",
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2.5,
                      bgcolor: "#fbeaec",
                      display: "grid",
                      placeItems: "center",
                      mb: 1.75,
                    }}
                  >
                    <c.icon sx={{ color: "primary.main", fontSize: 24 }} />
                  </Box>
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary", mb: 0.5 }}
                  >
                    {c.label}
                  </Typography>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: "text.primary", lineHeight: 1.5 }}>
                    {c.value}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal delay={120}>
          <Paper
            sx={{
              mt: { xs: 4, md: 5 },
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              textAlign: "center",
              bgcolor: "secondary.main",
              color: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ color: "#fff", mb: 1 }}>
              Already a client?
            </Typography>
            <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center", mb: 2.5 }}>
              <TimelineRoundedIcon sx={{ color: "#f0808d", fontSize: 20 }} />
              <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 15 }}>
                Use your tracking number for a live status update.
              </Typography>
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "center" }}>
              <Button href="/#free-cv-check" variant="contained" size="large">
                Get your free CV check
              </Button>
              <Button
                href="/case-tracker"
                variant="outlined"
                size="large"
                sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.5)", "&:hover": { borderColor: "#fff" } }}
              >
                Track your case
              </Button>
            </Stack>
          </Paper>
        </Reveal>
      </Container>
    </>
  );
}
