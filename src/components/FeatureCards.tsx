"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";

export type Feature = {
  icon: SvgIconComponent;
  title: string;
  /** One short line. Cards carry the message; paragraphs do not. */
  desc: string;
};

/** Grid of icon cards, the workhorse visual for secondary pages. */
export default function FeatureCards({
  items,
  columns = 3,
}: {
  items: Feature[];
  columns?: 2 | 3 | 4;
}) {
  const md = 12 / columns;
  return (
    <Grid container spacing={2}>
      {items.map((f, i) => (
        <Grid key={f.title} size={{ xs: 12, sm: 6, md }}>
          <Reveal delay={(i % columns) * 80} sx={{ height: "100%" }}>
            <Paper className="lift-card" sx={{ p: 2.5, borderRadius: 4, height: "100%" }}>
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
                <f.icon sx={{ color: "primary.main", fontSize: 24 }} />
              </Box>
              <Typography sx={{ fontWeight: 700, fontSize: 16.5, mb: 0.5 }}>{f.title}</Typography>
              <Typography sx={{ fontSize: 14.5, color: "text.secondary", lineHeight: 1.6 }}>
                {f.desc}
              </Typography>
            </Paper>
          </Reveal>
        </Grid>
      ))}
    </Grid>
  );
}

/** Big-number tiles, for facts worth reading at a glance. */
export function StatTiles({
  items,
}: {
  items: { value: string; label: string }[];
}) {
  return (
    <Grid container spacing={2}>
      {items.map((s, i) => (
        <Grid key={s.label} size={{ xs: 6, md: 12 / items.length }}>
          <Reveal delay={i * 80} sx={{ height: "100%" }}>
            <Paper
              className="lift-card"
              sx={{ p: 2.5, borderRadius: 4, height: "100%", textAlign: "center" }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: { xs: 26, md: 32 },
                  color: "primary.main",
                  lineHeight: 1.1,
                }}
              >
                {s.value}
              </Typography>
              <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.75, lineHeight: 1.5 }}>
                {s.label}
              </Typography>
            </Paper>
          </Reveal>
        </Grid>
      ))}
    </Grid>
  );
}
