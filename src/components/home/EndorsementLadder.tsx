"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SectionHeading from "@/components/home/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

const STEPS = [
  {
    title: "Share Your CV",
    desc: "We review your experience, qualifications, skills and sector knowledge.",
  },
  {
    title: "Profile Assessment",
    desc: "We find where your profile becomes a credible business proposition.",
  },
  {
    title: "Suggest Up to 2-3 Innovative Business Ideas",
    desc: "Concepts matched to your profile, or we refine your existing idea.",
  },
  {
    title: "Choose & Refine the Idea",
    desc: "Problem, customer, solution, innovation, advantage, revenue and growth.",
  },
  {
    title: "Initial Market Research",
    desc: "Target market, competitors, existing solutions and market gaps.",
  },
  {
    title: "Business Plan & Financial Model",
    desc: "Business model, forecasts, scalability and job-creation planning.",
  },
  {
    title: "Validate the Business",
    desc: "Surveys, LOIs, MVP, company formation and web presence, by package.",
  },
  {
    title: "Review & Unlimited Revisions",
    desc: "Unlimited revision rounds until the proposition is ready.",
  },
  {
    title: "Endorsement Application",
    desc: "Prepared and submitted to the appropriate Endorsing Body.",
  },
  {
    title: "Interview / Pitch",
    desc: "Preparation for innovation, market, financial and scalability questions.",
  },
  {
    title: "Endorsement Decision",
    desc: "If successful, your endorsement is granted.",
  },
  {
    title: "Visa Application",
    desc: "We prepare the formal Innovator Founder visa application.",
  },
];

/**
 * §7 — Endorsement Process: the large vertical ladder. The central rail
 * draws itself as you scroll, each numbered node pops in, and cards slide
 * in from their side of the rail. On phones everything stacks on a left
 * rail. Reduced-motion users get the static layout.
 */
export default function EndorsementLadder() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The rail draws downward in step with scrolling.
        gsap.from(".ladder-rail", {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: ".ladder-body",
            start: "top 75%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        });

        // Each step: node pops, card slides in from its side.
        gsap.utils.toArray<HTMLElement>(".ladder-row").forEach((row) => {
          const side = row.dataset.side;
          gsap.from(row.querySelector(".ladder-node"), {
            scale: 0,
            autoAlpha: 0,
            duration: 0.45,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
          gsap.from(row.querySelector(".ladder-card"), {
            x: side === "right" ? 70 : -70,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope },
  );

  return (
    <Box
      id="endorsement-process"
      component="section"
      ref={scope}
      sx={{ py: { xs: 6, md: 9 }, bgcolor: "secondary.main", scrollMarginTop: 96, overflow: "hidden" }}
    >
      <Container>
        <SectionHeading
          onDark
          eyebrow="Endorsement process"
          title="The 12-step endorsement journey"
          subtitle="Every engagement follows the same staircase, from your CV to a submitted visa application."
        />
        <Box className="ladder-body" sx={{ position: "relative", maxWidth: 900, mx: "auto" }}>
          {/* Central rail (desktop) / left rail (mobile) */}
          <Box
            aria-hidden
            className="ladder-rail"
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: { xs: 19, md: "50%" },
              ml: { md: "-1.5px" },
              width: 3,
              borderRadius: 2,
              background: "linear-gradient(rgba(214,31,48,0.9), rgba(255,255,255,0.14))",
            }}
          />
          <Stack spacing={{ xs: 2.5, md: 3 }}>
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <Box
                  key={s.title}
                  className="ladder-row"
                  data-side={left ? "left" : "right"}
                  sx={{
                    position: "relative",
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: left ? "flex-start" : "flex-end" },
                    pl: { xs: 6.5, md: 0 },
                  }}
                >
                  {/* Node */}
                  <Box
                    aria-hidden
                    className="ladder-node"
                    sx={{
                      position: "absolute",
                      left: { xs: 0, md: "50%" },
                      top: { xs: 4, md: "50%" },
                      transform: { xs: "none", md: "translate(-50%, -50%)" },
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-geist-mono)",
                      fontWeight: 800,
                      fontSize: 14,
                      zIndex: 1,
                      boxShadow: "0 0 0 5px rgba(214,31,48,0.22)",
                    }}
                  >
                    {i + 1}
                  </Box>
                  <Box className="ladder-card" sx={{ width: { xs: "100%", md: "calc(50% - 44px)" } }}>
                    <Paper
                      className="lift-card"
                      sx={{
                        p: 2.5,
                        borderRadius: 3.5,
                        bgcolor: "rgba(255,255,255,0.055)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <Typography
                        sx={{ fontSize: 12.5, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", color: "#f0808d", mb: 0.5 }}
                      >
                        Step {i + 1}
                      </Typography>
                      <Typography sx={{ fontWeight: 700, fontSize: 17, color: "#fff", mb: 0.5 }}>
                        {s.title}
                      </Typography>
                      <Typography sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>
                        {s.desc}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
