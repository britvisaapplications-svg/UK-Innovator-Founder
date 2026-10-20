"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import { SITE_NAME } from "@/lib/site";

/**
 * Wordmark: a crimson ascending-steps mark beside the site name, the same
 * staircase motif used across the journey sections. Placeholder until the
 * client supplies a final logo; swap the SVG here and everything follows.
 */
export default function Logo({
  onDark = false,
  size = 30,
  showSlogan = true,
}: {
  onDark?: boolean;
  size?: number;
  showSlogan?: boolean;
}) {
  return (
    <Box
      component={Link}
      href="/"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.25,
        textDecoration: "none",
        color: "inherit",
      }}
      aria-label={`${SITE_NAME} home`}
    >
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
        {/* Three ascending steps + flag: the founder journey, climbing. */}
        <path d="M4 40h12v-8H4v8z" fill="#d61f30" opacity="0.55" />
        <path d="M18 32h12V22H18v10z" fill="#d61f30" opacity="0.8" />
        <path d="M32 22h12V10H32v12z" fill="#d61f30" />
        <path d="M38 10V4l6 3-6 3z" fill={onDark ? "#ffffff" : "#15181d"} />
      </svg>
      <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <Box
          component="span"
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: size * 0.58,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: onDark ? "#ffffff" : "secondary.main",
            whiteSpace: "nowrap",
          }}
        >
          UK Innovator{" "}
          <Box component="span" sx={{ color: "primary.main" }}>
            Founder
          </Box>
        </Box>
        {showSlogan && (
          <Box
            component="span"
            sx={{
              mt: 0.4,
              fontSize: size * 0.29,
              fontWeight: 600,
              color: onDark ? "rgba(255,255,255,0.6)" : "text.secondary",
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            Your idea, refined for endorsement
          </Box>
        )}
      </Box>
    </Box>
  );
}
