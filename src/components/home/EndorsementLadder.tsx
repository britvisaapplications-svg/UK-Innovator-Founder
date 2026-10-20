"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import SectionHeading from "@/components/home/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";

type Step = { title: string; desc: string };

/**
 * Two rows of six, split where the work changes character: shaping the
 * business, then proving it and applying. The idea is always the client's
 * own; we review, discuss and refine it, never supply it.
 */
const ROWS: { label: string; steps: Step[] }[] = [
  {
    label: "Shape the business",
    steps: [
      { title: "Share Your CV & Idea", desc: "Your experience, skills and the idea you want to pursue." },
      { title: "Profile Assessment", desc: "How well your background supports your idea." },
      { title: "Idea Discussion", desc: "We discuss your idea and flag potential weaknesses." },
      { title: "Refine Your Idea", desc: "Problem, customer, solution, innovation and revenue." },
      { title: "Market Research", desc: "Target market, competitors and market gaps." },
      { title: "Business Plan & Financials", desc: "Business model, forecasts, scalability and jobs." },
    ],
  },
  {
    label: "Prove it and apply",
    steps: [
      { title: "Validate the Business", desc: "Surveys, LOIs, MVP and company formation, by package." },
      { title: "Review & Revisions", desc: "Unlimited revision rounds until it is ready." },
      { title: "Endorsement Application", desc: "Submitted to the appropriate Endorsing Body." },
      { title: "Interview / Pitch", desc: "Preparation for innovation, market and finance questions." },
      { title: "Endorsement Decision", desc: "Made by the Endorsing Body alone." },
      { title: "Visa Application", desc: "The formal Innovator Founder visa application." },
    ],
  },
];

const TOTAL = ROWS.reduce((sum, row) => sum + row.steps.length, 0);

/**
 * §7, Endorsement Process: twelve steps on two horizontal tracks.
 *
 * Desktop: each row is a rail with numbered nodes sitting on it and the
 * step text beneath, so the whole journey fits in roughly one screen.
 * The rail draws left to right and the nodes pop in as the row scrolls
 * into view. Tablet: three per line. Phone: a compact two-column grid.
 */
export default function EndorsementLadder() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".track-row").forEach((row) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });
          tl.from(row.querySelector(".track-rail"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.8,
            ease: "power2.inOut",
          }).from(
            row.querySelectorAll(".track-step"),
            { y: 24, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: "back.out(1.6)" },
            "-=0.6",
          );
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
          subtitle="From your CV and idea to a submitted visa application."
        />

        <Box sx={{ display: "grid", gap: { xs: 4, md: 5 } }}>
          {ROWS.map((row, r) => (
            <Box key={row.label} className="track-row">
              <Typography
                sx={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                  color: "#f0808d",
                  mb: { xs: 2, md: 1.5 },
                }}
              >
                {row.label}
              </Typography>

              <Box sx={{ position: "relative" }}>
                {/* Rail through the node centres (desktop only) */}
                <Box
                  aria-hidden
                  className="track-rail"
                  sx={{
                    display: { xs: "none", md: "block" },
                    position: "absolute",
                    top: 19,
                    left: 20,
                    right: 0,
                    height: 3,
                    borderRadius: 2,
                    background: "linear-gradient(90deg, rgba(214,31,48,0.95), rgba(255,255,255,0.14))",
                  }}
                />
                <Box
                  component="ol"
                  sx={{
                    listStyle: "none",
                    m: 0,
                    p: 0,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(6, 1fr)" },
                    columnGap: { xs: 2, md: 2.5 },
                    rowGap: { xs: 2.5, md: 0 },
                  }}
                >
                  {row.steps.map((s, i) => {
                    // Rows are equal length, so numbering continues across them.
                    const n = r * row.steps.length + i + 1;
                    const isFinal = n === TOTAL;
                    return (
                      <Box component="li" key={s.title} className="track-step" sx={{ position: "relative" }}>
                        <Box
                          aria-hidden
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                            fontFamily: "var(--font-geist-mono)",
                            fontWeight: 800,
                            fontSize: 14,
                            color: "#fff",
                            bgcolor: isFinal ? "primary.main" : "#2a2f37",
                            border: "2px solid",
                            borderColor: "primary.main",
                            boxShadow: "0 0 0 5px #15181d",
                            position: "relative",
                            zIndex: 1,
                            mb: 1.5,
                          }}
                        >
                          {n}
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: { xs: 14.5, md: 15 }, color: "#fff", lineHeight: 1.3, mb: 0.5 }}>
                          <Box component="span" sx={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                            Step {n}:{" "}
                          </Box>
                          {s.title}
                        </Typography>
                        <Typography sx={{ fontSize: 13.5, color: "rgba(255,255,255,0.66)", lineHeight: 1.5, pr: { md: 1 } }}>
                          {s.desc}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
