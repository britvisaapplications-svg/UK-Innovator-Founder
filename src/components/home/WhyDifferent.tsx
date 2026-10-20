"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ReportProblemRoundedIcon from "@mui/icons-material/ReportProblemRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import type { SvgIconComponent } from "@mui/icons-material";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";
import { IAA_NOTE } from "@/lib/site";

/** Widths of the placeholder lines standing in for CV content. */
const CV_LINES = ["88%", "64%", "94%", "72%", "84%", "58%"];

/** A stylised CV, drawn in CSS so it scales and needs no image asset. */
function CvSheet() {
  return (
    <Box
      aria-hidden
      sx={{
        width: { xs: 172, md: 196 },
        bgcolor: "#fff",
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 20px 44px -22px rgba(20,22,28,0.45)",
        p: 2,
        transform: "rotate(-3deg)",
      }}
    >
      {/* Name block */}
      <Stack direction="row" spacing={1.25} sx={{ alignItems: "center", mb: 1.75 }}>
        <Box sx={{ width: 30, height: 30, borderRadius: "50%", bgcolor: "#fbeaec", flexShrink: 0 }} />
        <Stack spacing={0.5} sx={{ flex: 1 }}>
          <Box sx={{ height: 7, borderRadius: 1, bgcolor: "secondary.main", width: "70%" }} />
          <Box sx={{ height: 5, borderRadius: 1, bgcolor: "divider", width: "45%" }} />
        </Stack>
      </Stack>
      {/* Body lines. Two are crimson: the parts of your idea we test first. */}
      <Stack spacing={0.9}>
        {CV_LINES.map((w, i) => (
          <Box
            key={i}
            sx={{
              height: 5,
              borderRadius: 1,
              width: w,
              bgcolor: i === 0 || i === 3 ? "rgba(214,31,48,0.35)" : "rgba(20,22,28,0.10)",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}

/** One thing you get back. The three are tilted slightly so they read as a set. */
function OutcomeCard({
  icon: Icon,
  tilt,
  kicker,
  label,
}: {
  icon: SvgIconComponent;
  tilt: number;
  kicker: string;
  label: string;
}) {
  return (
    <Paper
      className="lift-card"
      sx={{
        p: 1.75,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        transform: `rotate(${tilt}deg)`,
        boxShadow: "0 14px 30px -18px rgba(20,22,28,0.4)",
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "50%",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          bgcolor: "#fbeaec",
        }}
      >
        <Icon sx={{ fontSize: 19, color: "primary.main" }} />
      </Box>
      <Box>
        <Typography
          sx={{ fontFamily: "var(--font-geist-mono)", fontSize: 11, fontWeight: 800, color: "primary.main" }}
        >
          {kicker}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>
          {label}
        </Typography>
      </Box>
    </Paper>
  );
}

/**
 * §12, why our approach is different.
 *
 * Compliance: we never supply business ideas. The idea is always the
 * client's own; we discuss it, flag weaknesses and help refine it. Drawn
 * rather than described: what you send, an arrow, what comes back.
 */
export default function WhyDifferent() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 9 }, bgcolor: "#fff" }}>
      <Container>
        <SectionHeading
          eyebrow="Why we're different"
          title="Your idea, tested and refined"
          subtitle="Endorsing Bodies expect you to own and defend your idea. We help you find its weak spots and sharpen it."
        />

        <Reveal>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 5,
              p: { xs: 3, md: 5 },
              background:
                "radial-gradient(700px 260px at 15% 0%, rgba(214,31,48,0.05), transparent 60%), #f6f7f9",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 3, md: 5 }}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              {/* What you send */}
              <Stack sx={{ alignItems: "center" }}>
                <CvSheet />
                <Typography
                  sx={{ mt: 2, fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "text.secondary" }}
                >
                  Your CV + your idea
                </Typography>
              </Stack>

              {/* The transformation */}
              <Stack sx={{ alignItems: "center" }}>
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "primary.main",
                    color: "#fff",
                    boxShadow: "0 0 0 8px rgba(214,31,48,0.10)",
                  }}
                >
                  <ArrowForwardRoundedIcon sx={{ display: { xs: "none", md: "block" } }} />
                  <ArrowDownwardRoundedIcon sx={{ display: { xs: "block", md: "none" } }} />
                </Box>
                <Typography
                  sx={{ mt: 1.5, fontSize: 13.5, color: "text.secondary", textAlign: "center", maxWidth: 160 }}
                >
                  We discuss it against your profile
                </Typography>
              </Stack>

              {/* What comes back */}
              <Stack sx={{ alignItems: "center", width: { xs: "100%", sm: "auto" } }}>
                <Stack spacing={1.25} sx={{ width: { xs: "100%", sm: 300 } }}>
                  <OutcomeCard icon={ForumRoundedIcon} tilt={-1.5} kicker="DISCUSSED" label="Your idea talked through with you" />
                  <OutcomeCard icon={ReportProblemRoundedIcon} tilt={0.75} kicker="CHALLENGED" label="Potential weaknesses identified" />
                  <OutcomeCard icon={TuneRoundedIcon} tilt={-0.5} kicker="REFINED" label="Sharpened for the Endorsing Body" />
                </Stack>
                <Typography
                  sx={{ mt: 2, fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "primary.main" }}
                >
                  What you get back
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Reveal>

        <Reveal delay={60}>
          <Typography
            sx={{ mt: 3, fontSize: 15, fontWeight: 700, textAlign: "center", maxWidth: 640, mx: "auto" }}
          >
            We do not supply business ideas. Do your own research and bring an innovative idea;
            we will discuss it with you and help you refine it.
          </Typography>
        </Reveal>

        <Reveal delay={100}>
          <Stack
            direction="row"
            spacing={1.25}
            sx={{ alignItems: "center", justifyContent: "center", mt: 1.5 }}
          >
            <GavelRoundedIcon sx={{ fontSize: 18, color: "primary.main", flexShrink: 0 }} />
            <Typography sx={{ fontSize: 13.5, color: "text.secondary", textAlign: "center" }}>
              {IAA_NOTE}
            </Typography>
          </Stack>
        </Reveal>
      </Container>
    </Box>
  );
}
