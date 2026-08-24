"use client";

import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SvgIconComponent } from "@mui/icons-material";

/**
 * Shared hero band for secondary pages: crimson eyebrow with an icon, a
 * display-face title, one short line of intro, and room for buttons or
 * chips underneath. Matches the Team and Office page heroes.
 */
export default function PageHero({
  icon: Icon,
  eyebrow,
  title,
  intro,
  children,
}: {
  icon?: SvgIconComponent;
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <Box
      sx={{
        borderBottom: "1px solid",
        borderColor: "divider",
        background:
          "radial-gradient(1100px 500px at 85% -10%, rgba(214,31,48,0.10), transparent 60%), #f6f7f9",
      }}
    >
      <Container sx={{ py: { xs: 5, md: 7 } }}>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "primary.main", mb: 1.5 }}>
          {Icon && <Icon sx={{ fontSize: 18 }} />}
          <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
            {eyebrow}
          </Typography>
        </Stack>
        <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 44 }, lineHeight: 1.1, maxWidth: 820 }}>
          {title}
        </Typography>
        {intro && (
          <Typography sx={{ mt: 2, color: "text.secondary", maxWidth: 660, lineHeight: 1.7, fontSize: { xs: 16, md: 17.5 } }}>
            {intro}
          </Typography>
        )}
        {children && <Box sx={{ mt: 3.5 }}>{children}</Box>}
      </Container>
    </Box>
  );
}
