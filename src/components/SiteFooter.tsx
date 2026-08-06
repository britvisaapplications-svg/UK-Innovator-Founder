"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Logo from "@/components/Logo";
import { IAA_NOTE, LEGAL_LINKS, SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

/**
 * Sitewide footer, kept lean: brand blurb plus the legal & compliance links
 * (as dedicated pages, per the brief) over the regulatory strip. All other
 * navigation lives in the header and the hero tiles.
 */
export default function SiteFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: "secondary.main", color: "rgba(255,255,255,0.8)", mt: "auto" }}>
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Logo onDark size={26} />
            <Typography sx={{ fontSize: 14.5, lineHeight: 1.7, mt: 2, maxWidth: 380 }}>
              Send us your CV and, where appropriate, we can suggest up to 2-3 innovative
              business ideas based on your profile, then develop the one you choose towards
              endorsement and your Innovator Founder visa application.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                color: "#fff",
                mb: 1.5,
              }}
            >
              Legal &amp; Compliance
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                columnGap: 3,
                rowGap: 1,
              }}
            >
              {LEGAL_LINKS.map((l) => (
                <Box
                  key={l.label}
                  component={Link}
                  href={l.href}
                  sx={{
                    fontSize: 14.5,
                    color: "rgba(255,255,255,0.72)",
                    textDecoration: "none",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  {l.label}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.12)" }} />

        {/* Regulatory strip, entity name, IAA registration, contact details TBC. */}
        <Stack spacing={1}>
          <Typography sx={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)" }}>
            {IAA_NOTE} Professional fees are separate from Endorsing Body fees and Home Office
            fees, which are payable directly to those organisations. Endorsement and visa
            decisions rest with the relevant Endorsing Body and the Home Office; outcomes are
            never guaranteed.
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            <Box
              component="a"
              href={`mailto:${SUPPORT_EMAIL}`}
              sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}
            >
              {SUPPORT_EMAIL}
            </Box>
            {" · "}
            <Box
              component="a"
              href={`tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`}
              sx={{ color: "inherit", textDecoration: "none", "&:hover": { color: "#fff" } }}
            >
              {SUPPORT_PHONE}
            </Box>
          </Typography>
          <Typography sx={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
