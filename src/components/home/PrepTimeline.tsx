"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/**
 * How long each stage takes, in weeks. `min`–`max` is a typical range, not a
 * promise. `owner` is who controls the clock, which is the thing visitors
 * most often misunderstand: only the first two stages are in our hands.
 *
 * Sources: Home Office decision times from gov.uk/innovator-founder-visa
 * (usually 3 weeks outside the UK, 8 weeks inside). Endorsing Body time is
 * the same planning range quoted in the FAQs.
 */
const STAGES: { title: string; detail: string; owner: string; ours: boolean; min: number; max: number }[] = [
  {
    title: "Idea review & profile assessment",
    detail: "Your CV and idea reviewed, discussed and weaknesses flagged",
    owner: "You + us",
    ours: true,
    min: 1,
    max: 2,
  },
  {
    title: "Refinement, research & business plan",
    detail: "Depends on how developed your idea is and on your package",
    owner: "You + us",
    ours: true,
    min: 3,
    max: 6,
  },
  {
    title: "Endorsing Body assessment",
    detail: "Review, due diligence and interview where required",
    owner: "Endorsing Body",
    ours: false,
    min: 4,
    max: 8,
  },
  {
    title: "Home Office visa decision",
    detail: "Usually 3 weeks from outside the UK, 8 weeks from inside",
    owner: "Home Office",
    ours: false,
    min: 3,
    max: 8,
  },
];

const SCALE = 8; // weeks shown on the ruler
const pct = (w: number) => `${(w / SCALE) * 100}%`;
const range = (s: { min: number; max: number }) => `${s.min}-${s.max} weeks`;

/** Solid to the typical minimum, hatched on to the typical maximum. */
function DurationBar({ min, max, ours }: { min: number; max: number; ours: boolean }) {
  const color = ours ? "#d61f30" : "#15181d";
  return (
    <Box sx={{ position: "relative", height: 14, borderRadius: 999, bgcolor: "#eef0f3" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          right: "auto",
          width: pct(max),
          borderRadius: 999,
          background: `repeating-linear-gradient(135deg, color-mix(in srgb, ${color} 30%, transparent) 0 4px, transparent 4px 8px)`,
        }}
      />
      <Box sx={{ position: "absolute", inset: 0, right: "auto", width: pct(min), borderRadius: 999, bgcolor: color }} />
    </Box>
  );
}

/** §8, Timeline: realistic duration of each stage, and who sets it. */
export default function PrepTimeline() {
  return (
    <Box id="timeline" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container>
        <SectionHeading
          eyebrow="Timeline"
          title="About 3 to 6 months, end to end"
          subtitle="Typical time for each stage. Only the first two are in our hands; the rest is set by the Endorsing Body and the Home Office."
        />

        <Reveal>
          <Paper sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: 5 }}>
            {/* Week ruler, aligned with the bar column (desktop) */}
            <Box
              aria-hidden
              sx={{
                display: { xs: "none", md: "grid" },
                gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr) 170px",
                columnGap: 3,
                pb: 1,
                mb: 1,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <span />
              <Box sx={{ position: "relative", height: 18 }}>
                {Array.from({ length: SCALE + 1 }, (_, w) => (
                  <Typography
                    key={w}
                    component="span"
                    sx={{
                      position: "absolute",
                      left: pct(w),
                      transform: w === 0 ? "none" : w === SCALE ? "translateX(-100%)" : "translateX(-50%)",
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "text.secondary",
                    }}
                  >
                    {w}
                  </Typography>
                ))}
              </Box>
              <Typography component="span" sx={{ fontFamily: "var(--font-geist-mono)", fontSize: 11.5, fontWeight: 700, color: "text.secondary", textAlign: "right" }}>
                weeks
              </Typography>
            </Box>

            <Stack divider={<Box sx={{ borderTop: "1px solid", borderColor: "divider" }} />}>
              {STAGES.map((s, i) => (
                <Box
                  key={s.title}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr auto", md: "minmax(0, 5fr) minmax(0, 6fr) 170px" },
                    gridTemplateAreas: { xs: `"title dur" "bar bar"`, md: `"title bar dur"` },
                    columnGap: 3,
                    rowGap: 1.25,
                    alignItems: "center",
                    py: 2,
                  }}
                >
                  <Box sx={{ gridArea: "title", minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 15.5, lineHeight: 1.3 }}>
                      <Box component="span" sx={{ fontFamily: "var(--font-geist-mono)", color: "primary.main", mr: 1 }}>
                        {i + 1}
                      </Box>
                      {s.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13.5, color: "text.secondary", lineHeight: 1.5, mt: 0.25 }}>
                      {s.detail}
                    </Typography>
                  </Box>
                  <Box sx={{ gridArea: "bar" }}>
                    <DurationBar min={s.min} max={s.max} ours={s.ours} />
                  </Box>
                  <Box sx={{ gridArea: "dur", textAlign: "right" }}>
                    <Typography sx={{ fontFamily: "var(--font-geist-mono)", fontWeight: 800, fontSize: 14.5, whiteSpace: "nowrap" }}>
                      {range(s)}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap", color: s.ours ? "primary.main" : "text.secondary" }}
                    >
                      {s.owner}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Legend */}
            <Stack
              direction="row"
              sx={{ flexWrap: "wrap", gap: 2.5, rowGap: 1, mt: 1.5, pt: 2, borderTop: "1px solid", borderColor: "divider" }}
            >
              {[
                { swatch: "#d61f30", label: "Stages we work on with you" },
                { swatch: "#15181d", label: "Set by the Endorsing Body or Home Office" },
              ].map((l) => (
                <Stack key={l.label} direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Box sx={{ width: 22, height: 10, borderRadius: 999, bgcolor: l.swatch }} />
                  <Typography sx={{ fontSize: 13, color: "text.secondary" }}>{l.label}</Typography>
                </Stack>
              ))}
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 22,
                    height: 10,
                    borderRadius: 999,
                    background: "repeating-linear-gradient(135deg, rgba(21,24,29,0.3) 0 4px, transparent 4px 8px)",
                  }}
                />
                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>Can take longer</Typography>
              </Stack>
            </Stack>
          </Paper>
        </Reveal>

        <Reveal delay={150}>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", justifyContent: "center", mt: 2.5 }}>
            <InfoRoundedIcon sx={{ fontSize: 18, color: "text.secondary", flexShrink: 0 }} />
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", textAlign: "center" }}>
              Your endorsement must be used for a visa application within 3 months. Timings are
              indicative and never guaranteed.
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
