"use client";

import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LeadForm from "@/components/home/LeadForm";
import { SECTION_TILES } from "@/lib/site";
import { pulseLeadForm } from "@/lib/leadFormCta";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

/** Six hero benefits, animate left-to-right on load, per the brief. */
const BENEFITS = [
  "No Employer Sponsor Required",
  "Build & Run Your Own UK Business",
  "Eligible Outside Skilled Employment",
  "Bring Eligible Dependants",
  "Potential ILR After 3 Years",
  "IAA-Regulated Immigration Support",
];

/**
 * Hero & lead collection. Desktop: copy + tiles left, form right (above the
 * fold). Mobile: the form follows the hero text immediately, per the brief.
 *
 * One orchestrated GSAP load timeline: eyebrow → headline words → subtext →
 * benefit chips sweeping left-to-right → tile buttons cascading up → form.
 */
export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".js-headline", { type: "words" });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".js-eyebrow", { y: 16, autoAlpha: 0, duration: 0.5 })
          .from(
            split.words,
            { y: 34, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: "back.out(1.6)" },
            "-=0.25",
          )
          .from(".js-sub", { y: 18, autoAlpha: 0, duration: 0.55 }, "-=0.45")
          .from(".js-chip", { x: -30, autoAlpha: 0, duration: 0.45, stagger: 0.07 }, "-=0.3")
          .from(
            ".js-tile",
            { y: 26, autoAlpha: 0, scale: 0.94, duration: 0.5, stagger: 0.06, ease: "back.out(1.5)" },
            "-=0.25",
          )
          .from(".js-form", { y: 32, autoAlpha: 0, duration: 0.7 }, 0.35);

        return () => split.revert();
      });
    },
    { scope },
  );

  // Arriving from another page via a Free CV Check CTA: run the same
  // scroll + pulse + focus feedback once the page has settled.
  useEffect(() => {
    if (window.location.hash === "#free-cv-check") {
      const t = window.setTimeout(pulseLeadForm, 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Box
      ref={scope}
      sx={{
        background:
          "radial-gradient(1100px 500px at 85% -10%, rgba(214,31,48,0.10), transparent 60%), radial-gradient(900px 420px at -10% 20%, rgba(23,179,201,0.07), transparent 55%), #f6f7f9",
        pt: { xs: 3, md: 4 },
        pb: { xs: 5, md: 7 },
        overflow: "hidden",
      }}
    >
      <Container>
        {/* Named grid areas: on phones the form follows the hero copy
            immediately (client requirement); the tiles drop below it. */}
        <Box
          sx={{
            display: "grid",
            gap: { xs: 4, md: 5 },
            gridTemplateColumns: { xs: "1fr", md: "5.5fr 6.5fr" },
            // Row 1 hugs the copy so the tiles sit right beneath it.
            gridTemplateRows: { md: "auto 1fr" },
            gridTemplateAreas: {
              xs: `"copy" "form" "tiles"`,
              md: `"copy form" "tiles form"`,
            },
            alignItems: "start",
          }}
        >
          {/* Copy + benefit chips */}
          <Box sx={{ gridArea: "copy" }}>
            <Typography
              className="js-eyebrow"
              sx={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                color: "primary.main",
                mb: 1,
              }}
            >
              UK Innovator Founder Visa
            </Typography>
            <Typography
              variant="h1"
              className="js-headline"
              sx={{ fontSize: { xs: 30, sm: 34, md: 42 }, color: "secondary.main", maxWidth: 620 }}
            >
              Build Your Own Innovative Business in the UK
            </Typography>
            <Typography
              className="js-sub"
              sx={{
                mt: 1.5,
                fontSize: { xs: 15, md: 16.5 },
                color: "text.secondary",
                lineHeight: 1.6,
                maxWidth: 560,
              }}
            >
              No employer sponsor required. Potential ILR after 3 years. Start with your CV.
              No business idea yet? We can suggest up to 2-3 based on your profile.
            </Typography>

            {/* Benefit chips, sweep in left-to-right */}
            <Stack
              direction="row"
              sx={{ flexWrap: "wrap", gap: 0.6, mt: 1.5, maxWidth: 620 }}
              aria-label="Key benefits"
            >
              {BENEFITS.map((b) => (
                <Chip
                  key={b}
                  className="js-chip"
                  icon={<CheckRoundedIcon sx={{ fontSize: 16 }} />}
                  label={b}
                  sx={{
                    bgcolor: "#fff",
                    border: "1px solid",
                    borderColor: "divider",
                    fontWeight: 600,
                    fontSize: 13.5,
                    height: 32,
                    "& .MuiChip-icon": { color: "success.main" },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* Coloured section tiles, the site's section navigation.
              Two per row per the client's ask; each smooth-scrolls to its
              homepage section. */}
          <Box
            sx={{
              gridArea: "tiles",
              maxWidth: 640,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 0.75,
            }}
          >
            {SECTION_TILES.map((t) => (
              <Box
                key={t.id}
                component="button"
                type="button"
                onClick={() => scrollTo(t.id)}
                className="js-tile tile-bar"
                sx={{
                  border: "none",
                  borderRadius: 2.5,
                  background: `linear-gradient(135deg, ${t.color}, color-mix(in srgb, ${t.color} 82%, #000))`,
                  color: "#fff",
                  fontFamily: "var(--font-display), inherit",
                  fontWeight: 700,
                  fontSize: { xs: 13.5, md: 15.5 },
                  letterSpacing: 0.6,
                  lineHeight: 1.25,
                  textTransform: "uppercase",
                  textAlign: "left",
                  px: { xs: 1.75, md: 2.25 },
                  py: 1.75,
                  minHeight: { xs: 60, md: 68 },
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1,
                  boxShadow: `0 6px 16px -8px color-mix(in srgb, ${t.color} 70%, transparent)`,
                }}
                aria-label={`Scroll to ${t.label}`}
              >
                <span>{t.label}</span>
                <ChevronRightRoundedIcon className="tile-chevron" sx={{ fontSize: 20, flexShrink: 0 }} />
              </Box>
            ))}
          </Box>

          {/* Lead form, above the fold on desktop, right after copy on mobile.
              The column stretches and centers its content, so the compact
              thank-you card sits mid-column instead of hugging the top. */}
          <Box sx={{ gridArea: "form", alignSelf: { md: "stretch" }, display: "flex" }}>
            <Box
              className="js-form"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: { md: "center" },
              }}
            >
              <LeadForm />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
