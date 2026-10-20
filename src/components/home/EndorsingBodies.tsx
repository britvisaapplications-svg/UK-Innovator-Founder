"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

/** Endorsing Body fees and the endorsement window. Durations live in the Timeline. */
const FACTS: { icon: SvgIconComponent; value: string; label: string }[] = [
  { icon: AccountBalanceRoundedIcon, value: "£1,000 + VAT", label: "Initial endorsement fee, per person" },
  { icon: EventRepeatRoundedIcon, value: "£500 + VAT", label: "Per contact-point meeting (two required)" },
  { icon: TimerRoundedIcon, value: "3 months", label: "Window to use your endorsement" },
];

/** Approved bodies, shown as monogram badges until logos are supplied. */
const BODIES = [
  { mono: "UKES", name: "UK Endorsing Services" },
  { mono: "II", name: "Innovator International" },
  { mono: "EL", name: "Envestors Limited" },
  { mono: "GEP", name: "Global Entrepreneurs Programme", note: "Invitation only" },
];

/**
 * §9 + §10, the Endorsing Bodies: fee and timing tiles, and monogram badges
 * for the four approved bodies. The assessment steps themselves live in the
 * 12-step journey, so they are not repeated here.
 */
export default function EndorsingBodies() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="Endorsing Bodies"
          title="Who endorses you, and what they charge"
          subtitle="Your application is assessed independently. Their fees are paid directly to them and are always separate from ours."
        />

        {/* Fees and timings */}
        <Grid container spacing={2}>
          {FACTS.map((f, i) => (
            <Grid key={f.label} size={{ xs: 12, sm: 4 }}>
              <Reveal delay={i * 80} sx={{ height: "100%" }}>
                <Paper
                  className="lift-card"
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    height: "100%",
                    textAlign: "center",
                    borderTop: "3px solid",
                    borderTopColor: "primary.main",
                  }}
                >
                  <f.icon sx={{ color: "primary.main", fontSize: 26, mb: 0.75 }} />
                  <Typography
                    sx={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: { xs: 20, sm: 24, md: 28 },
                      lineHeight: 1.1,
                      color: "secondary.main",
                    }}
                  >
                    {f.value}
                  </Typography>
                  <Typography sx={{ fontSize: 13.5, color: "text.secondary", mt: 0.75, lineHeight: 1.5 }}>
                    {f.label}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        {/* Approved bodies as monogram badges */}
        <Reveal delay={120}>
          <Box sx={{ mt: { xs: 4, md: 5 } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", mb: 2 }}>
              <VerifiedRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
              <Typography
                sx={{ fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}
              >
                Four approved Endorsing Bodies
              </Typography>
            </Stack>
            <Grid container spacing={1.5}>
              {BODIES.map((b) => (
                <Grid key={b.mono} size={{ xs: 6, md: 3 }}>
                  <Paper
                    className="lift-card"
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 4,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 2,
                        flexShrink: 0,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "secondary.main",
                        color: "#fff",
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: b.mono.length > 2 ? 13 : 16,
                        letterSpacing: 0.3,
                      }}
                      aria-hidden
                    >
                      {b.mono}
                    </Box>
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.35 }}>
                        {b.name}
                      </Typography>
                      {b.note && (
                        <Typography sx={{ fontSize: 12, color: "primary.main", fontWeight: 700, mt: 0.25 }}>
                          {b.note}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Typography
              sx={{ fontSize: 13, color: "text.secondary", textAlign: "center", mt: 2.5, maxWidth: 600, mx: "auto" }}
            >
              Endorsement decisions rest solely with the Endorsing Body. Timings are indicative
              and never guaranteed.
            </Typography>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
