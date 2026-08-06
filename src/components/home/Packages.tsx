"use client";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { useLeadFormCta } from "@/lib/leadFormCta";

type Pkg = {
  name: string;
  price: string;
  recommended?: boolean;
  included: string[];
  notIncluded: string[];
};

const PACKAGES: Pkg[] = [
  {
    name: "Basic",
    price: "£2,500–£3,000",
    included: [
      "Innovative idea development if needed",
      "Up to 2-3 business concepts",
      "Idea refinement",
      "Initial market research",
      "Standard business plan",
      "Basic financial model",
      "Application guidance",
      "Unlimited revisions",
    ],
    notIncluded: [
      "Market survey",
      "LOI support",
      "MVP",
      "Priority turnaround",
      "Company creation",
      "Website",
      "Social media",
    ],
  },
  {
    name: "Standard",
    price: "£3,500–£4,500",
    included: [
      "Everything in Basic",
      "In-depth market research",
      "Market survey",
      "Full financial model",
      "LOI drafting support",
      "Endorsing Body submission support",
      "Company creation",
      "Unlimited revisions",
      "Free re-application if rejected, no additional legal fee",
    ],
    notIncluded: ["MVP", "Dedicated priority support", "Website", "Social media"],
  },
  {
    name: "Premium",
    price: "£4,500–£6,000",
    recommended: true,
    included: [
      "Everything in Standard",
      "MVP creation included",
      "Priority turnaround & scheduling",
      "Dedicated advisor",
      "Post-submission query support",
      "Pitch & interview preparation",
      "Website development",
      "Social media development",
      "Free re-application if rejected",
      "No additional legal fee on qualifying re-application",
      "No Endorsing Body fee on qualifying re-application",
      "Support at 12-month meeting",
      "Support at 24-month meeting",
      "Continuous guidance through the 3-year journey towards ILR",
    ],
    notIncluded: [],
  },
];

/** §13, Packages & Fees: three equal-height comparison cards, Premium highlighted. */
export default function Packages() {
  const goToForm = useLeadFormCta();
  return (
    <Box id="packages" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Packages & fees"
          title="Choose how far we take you"
          subtitle="All packages include unlimited revision rounds. Professional fees are always separate from Endorsing Body and Home Office fees."
        />
        <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
          {PACKAGES.map((p, i) => (
            <Grid key={p.name} size={{ xs: 12, md: 4 }} sx={{ display: "flex" }}>
              <Reveal delay={i * 90} sx={{ width: "100%", display: "flex" }}>
                <Paper
                  className="lift-card"
                  sx={{
                    p: 3,
                    borderRadius: 5,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    ...(p.recommended
                      ? {
                          border: "2px solid",
                          borderColor: "primary.main",
                          boxShadow: "0 24px 50px -20px rgba(214,31,48,0.35)",
                        }
                      : {}),
                  }}
                >
                  {p.recommended && (
                    <Chip
                      icon={<StarRoundedIcon />}
                      label="RECOMMENDED"
                      color="primary"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -13,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontWeight: 800,
                        letterSpacing: 0.5,
                      }}
                    />
                  )}
                  <Typography
                    sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, textTransform: "uppercase", letterSpacing: 0.5 }}
                  >
                    {p.name}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 33, color: p.recommended ? "primary.main" : "secondary.main", my: 1 }}
                  >
                    {p.price}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 1.5 }}>
                    Professional fees only. Endorsing Body and Home Office fees are separate.
                  </Typography>
                  <Divider sx={{ mb: 1.5 }} />
                  <Stack spacing={0.9} sx={{ flex: 1 }}>
                    {p.included.map((f) => (
                      <Stack key={f} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                        <CheckRoundedIcon sx={{ fontSize: 18, color: "success.main", mt: 0.2 }} />
                        <Typography sx={{ fontSize: 14.25, lineHeight: 1.5 }}>{f}</Typography>
                      </Stack>
                    ))}
                    {p.notIncluded.map((f) => (
                      <Stack key={f} direction="row" spacing={1} sx={{ alignItems: "flex-start", opacity: 0.55 }}>
                        <CloseRoundedIcon sx={{ fontSize: 18, color: "text.disabled", mt: 0.2 }} />
                        <Typography sx={{ fontSize: 14.25, lineHeight: 1.5, color: "text.secondary" }}>
                          {f}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                  <Button
                    component={Link}
                    href="/#free-cv-check"
                    onClick={goToForm}
                    variant={p.recommended ? "contained" : "outlined"}
                    color={p.recommended ? "primary" : "secondary"}
                    fullWidth
                    size="large"
                    sx={{ mt: 2.5 }}
                  >
                    Start with a free CV check
                  </Button>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal delay={120}>
          <Stack spacing={1.5} sx={{ mt: 3 }}>
            <Alert severity="success" sx={{ borderRadius: 3 }}>
              <strong>Flexible instalments:</strong> all package fees can be paid in agreed
              instalments, with an invoice and receipt at each stage.
            </Alert>
            <Alert severity="info" sx={{ borderRadius: 3 }}>
              The exact conditions for free re-application and which third-party fees are covered
              are defined in your service agreement before you commit. Endorsing Body fees
              (£1,000 initial, £500 per contact-point meeting) and Home Office fees are always
              paid directly to those organisations.
            </Alert>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
