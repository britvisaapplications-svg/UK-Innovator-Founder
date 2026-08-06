"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { useLeadFormCta } from "@/lib/leadFormCta";

/**
 * Persistent Free CV Check CTA fixed to the bottom of the screen on phones,
 * an explicit client requirement. Hidden on the admin back-office, where it
 * would only get in the way.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const goToForm = useLeadFormCta();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "block", sm: "none" },
        p: 1.25,
        pb: "calc(10px + env(safe-area-inset-bottom))",
        bgcolor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid",
        borderColor: "divider",
        zIndex: (t) => t.zIndex.appBar,
      }}
    >
      <Button
        component={Link}
        href="/#free-cv-check"
        onClick={goToForm}
        variant="contained"
        fullWidth
        size="large"
        startIcon={<DescriptionRoundedIcon />}
      >
        Get Your Free CV Check
      </Button>
    </Box>
  );
}
