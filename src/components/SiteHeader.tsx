"use client";

import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import Logo from "@/components/Logo";
import { UTILITY_LINKS } from "@/lib/site";
import { useLeadFormCta } from "@/lib/leadFormCta";

/**
 * Single-row sticky header: logo · Our Team / Our Office / Approved Cases /
 * Case Tracker · Free CV Check. On phones the links drop to a compact second
 * line and the CTA hides (the sticky bottom bar carries it there). Section
 * navigation lives in the hero's coloured tiles.
 */
export default function SiteHeader() {
  const goToForm = useLeadFormCta();
  const links = (
    <>
      {UTILITY_LINKS.map((l) => (
        <Box
          key={l.href}
          component={Link}
          href={l.href}
          sx={{
            fontSize: { xs: 12.5, md: 14.5 },
            fontWeight: 700,
            letterSpacing: 0.4,
            color: "text.primary",
            textDecoration: "none",
            whiteSpace: "nowrap",
            "&:hover": { color: "primary.main" },
          }}
        >
          {l.label}
        </Box>
      ))}
    </>
  );

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "background.paper", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}
    >
      <Container>
        <Toolbar disableGutters sx={{ gap: 3, py: 0.5, minHeight: { xs: 56, md: 64 } }}>
          <Logo size={36} showSlogan={false} />
          <Box sx={{ flex: 1 }} />
          <Stack direction="row" spacing={3} sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
            {links}
          </Stack>
          {/* Hidden on phones, the sticky bottom bar carries the CTA there. */}
          <Button
            component={Link}
            href="/#free-cv-check"
            onClick={goToForm}
            variant="contained"
            startIcon={<DescriptionRoundedIcon />}
            sx={{ whiteSpace: "nowrap", display: { xs: "none", sm: "inline-flex" } }}
          >
            Free CV Check
          </Button>
        </Toolbar>
        {/* Compact link row on phones */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            flexWrap: "wrap",
            rowGap: 0.25,
            pb: 1,
          }}
        >
          {links}
        </Stack>
      </Container>
    </AppBar>
  );
}
