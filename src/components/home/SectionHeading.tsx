"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Reveal from "@/components/Reveal";

/**
 * Shared section header: crimson eyebrow, display-face title, optional
 * subtitle. Keeps rhythm identical across all 18 homepage sections.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  onDark?: boolean;
}) {
  return (
    <Reveal>
      <Box
        sx={{
          textAlign: align,
          mb: { xs: 3.5, md: 5 },
          maxWidth: 780,
          mx: align === "center" ? "auto" : 0,
        }}
      >
        <Typography
          component="p"
          sx={{
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "primary.main",
            mb: 1,
          }}
        >
          {eyebrow}
        </Typography>
        <Typography variant="h3" sx={{ fontSize: { xs: 28, md: 38 }, color: onDark ? "#fff" : "secondary.main" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              mt: 1.5,
              color: onDark ? "rgba(255,255,255,0.7)" : "text.secondary",
              fontSize: { xs: 16, md: 17.5 },
              lineHeight: 1.65,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Reveal>
  );
}
