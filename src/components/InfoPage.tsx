"use client";

import type { ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type InfoSection = { heading?: string; body: ReactNode };

/**
 * Shared shell for secondary and legal pages: hero band, optional
 * draft-notice, then a single readable column of sections.
 */
export default function InfoPage({
  eyebrow,
  title,
  intro,
  draftNotice,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  /** Shown for legal drafts that still need client/lawyer sign-off. */
  draftNotice?: string;
  sections?: InfoSection[];
  children?: ReactNode;
}) {
  return (
    <Box sx={{ flex: 1, py: { xs: 5, md: 7 } }}>
      <Container sx={{ maxWidth: "860px !important" }}>
        <Stack sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            sx={{ fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "primary.main", mb: 1 }}
          >
            {eyebrow}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 38 } }}>
            {title}
          </Typography>
          {intro && (
            <Typography sx={{ color: "text.secondary", mt: 1.5, maxWidth: 640, mx: "auto", lineHeight: 1.7 }}>
              {intro}
            </Typography>
          )}
        </Stack>

        {draftNotice && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 3 }}>
            {draftNotice}
          </Alert>
        )}

        {sections && (
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 4 }}>
            <Stack spacing={3}>
              {sections.map((s, i) => (
                <Box key={s.heading ?? i}>
                  {s.heading && (
                    <Typography variant="h6" sx={{ mb: 1, fontSize: 18 }}>
                      {s.heading}
                    </Typography>
                  )}
                  <Typography component="div" sx={{ color: "text.secondary", fontSize: 15.5, lineHeight: 1.75 }}>
                    {s.body}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        )}

        {children}
      </Container>
    </Box>
  );
}
