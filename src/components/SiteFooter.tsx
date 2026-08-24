"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Logo from "@/components/Logo";
import { LEGAL_LINKS } from "@/lib/site";

/**
 * Sitewide footer on ink: the wordmark beside the legal & compliance links.
 * Regulatory and contact details live on their dedicated pages
 * (/registration-details, /contact) per the client's request.
 */
export default function SiteFooter() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "secondary.main", color: "rgba(255,255,255,0.8)", mt: "auto" }}
    >
      <Container sx={{ py: { xs: 4, md: 4.5 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 4 }}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Logo onDark size={34} showSlogan={false} />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              columnGap: { xs: 2.5, md: 3 },
              rowGap: 1.25,
            }}
          >
            {LEGAL_LINKS.map((l) => (
              <Box
                key={l.label}
                component={Link}
                href={l.href}
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.72)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  "&:hover": { color: "#fff" },
                }}
              >
                {l.label}
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
