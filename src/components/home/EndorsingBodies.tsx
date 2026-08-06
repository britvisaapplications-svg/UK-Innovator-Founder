"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import EventRepeatRoundedIcon from "@mui/icons-material/EventRepeatRounded";
import HourglassBottomRoundedIcon from "@mui/icons-material/HourglassBottomRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import FlowStrip from "@/components/home/FlowStrip";

const BODIES = [
  { name: "UK Endorsing Services", note: "Approved Endorsing Body" },
  { name: "Innovator International", note: "Approved Endorsing Body" },
  { name: "Envestors Limited", note: "Approved Endorsing Body" },
  {
    name: "Global Entrepreneurs Programme (GEP)",
    note: "Only for founders invited to its programme",
  },
];

const FACTS = [
  {
    icon: HourglassBottomRoundedIcon,
    title: "~4-8 weeks",
    desc: "Indicative Endorsing Body processing time, a planning guide only, never guaranteed.",
  },
  {
    icon: AccountBalanceRoundedIcon,
    title: "£1,000 per person",
    desc: "Initial Endorsing Body fee, paid directly to the Endorsing Body.",
  },
  {
    icon: EventRepeatRoundedIcon,
    title: "£500 per meeting",
    desc: "Mandatory contact-point meetings, paid directly to the Endorsing Body.",
  },
  {
    icon: TimerRoundedIcon,
    title: "3-month window",
    desc: "Once granted, your endorsement must be used for the visa application within 3 months.",
  },
];

/** §9 + §10, Endorsing Body assessment flow, key fees and the four approved bodies. */
export default function EndorsingBodies() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="Endorsing Body assessment"
          title="What happens after submission"
          subtitle="Your application is assessed independently by an approved Endorsing Body. Their fees are always separate from our professional fees."
        />

        <Reveal>
          <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 4, mb: 3 }}>
            <FlowStrip
              items={[
                "Application Submitted",
                "Initial Review & Due Diligence",
                "Interview / Pitch (where required)",
                "Further Information / Revisions",
                "Decision",
              ]}
            />
          </Paper>
        </Reveal>

        <Grid container spacing={2}>
          {FACTS.map((f, i) => (
            <Grid key={f.title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Reveal delay={i * 80} sx={{ height: "100%" }}>
                <Paper className="lift-card" sx={{ p: 2.5, borderRadius: 4, height: "100%" }}>
                  <f.icon sx={{ color: "primary.main", fontSize: 28, mb: 1 }} />
                  <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, mb: 0.5 }}>
                    {f.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.6 }}>
                    {f.desc}
                  </Typography>
                </Paper>
              </Reveal>
            </Grid>
          ))}
        </Grid>

        <Reveal delay={120}>
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 16, mb: 1.5, textAlign: "center" }}>
              Approved Endorsing Bodies
            </Typography>
            <Grid container spacing={1.5} sx={{ justifyContent: "center" }}>
              {BODIES.map((b) => (
                <Grid key={b.name} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, borderRadius: 3, height: "100%", textAlign: "center" }}
                  >
                    <Typography sx={{ fontWeight: 700, fontSize: 15 }}>{b.name}</Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                      {b.note}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Stack sx={{ alignItems: "center", mt: 2 }}>
              <Typography sx={{ fontSize: 13.5, color: "text.secondary", textAlign: "center", maxWidth: 640 }}>
                Endorsement decisions rest solely with the Endorsing Body. We prepare your
                proposition and application; we do not and cannot guarantee endorsement.
              </Typography>
            </Stack>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
