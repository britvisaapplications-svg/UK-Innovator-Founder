"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { gsap, useGSAP } from "@/lib/gsap";

export type LadderStep = {
  title: string;
  desc?: string;
};

/**
 * The signature journey staircase.
 *
 * Desktop: step cards climb left-to-right, each raised a little higher than
 * the last; when scrolled into view they rise in sequence like footsteps.
 * Mobile: degrades gracefully to a vertical rail with numbered nodes.
 *
 * `climb` sets how many px each desktop step rises relative to the previous.
 * (GSAP animates a wrapper element, so it never fights the climb transform.)
 */
export default function StepLadder({
  steps,
  climb = 14,
  accent = "#d61f30",
}: {
  steps: LadderStep[];
  climb?: number;
  accent?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);
  const maxRise = (steps.length - 1) * climb;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".ladder-step", {
          y: 44,
          autoAlpha: 0,
          duration: 0.55,
          ease: "back.out(1.4)",
          stagger: 0.09,
          scrollTrigger: { trigger: scope.current, start: "top 82%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <Box ref={scope}>
      {/* Desktop staircase */}
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: 1.25,
          alignItems: "end",
          pt: `${maxRise}px`,
        }}
      >
        {steps.map((s, i) => (
          <Box key={s.title} className="ladder-step" sx={{ alignSelf: "end" }}>
            <Box
              className="lift-card"
              sx={{
                transform: `translateY(-${i * climb}px)`,
                bgcolor: "#fff",
                border: "1px solid",
                borderColor: "divider",
                borderBottom: `3px solid ${accent}`,
                borderRadius: 2.5,
                p: 1.5,
                minHeight: 96,
                display: "flex",
                flexDirection: "column",
                gap: 0.75,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-geist-mono)",
                  fontSize: 13,
                  fontWeight: 800,
                  color: accent,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, lineHeight: 1.35 }}>
                {s.title}
              </Typography>
              {s.desc && (
                <Typography sx={{ fontSize: 13, color: "text.secondary", lineHeight: 1.5 }}>
                  {s.desc}
                </Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Mobile rail */}
      <Stack sx={{ display: { xs: "flex", md: "none" } }} spacing={0}>
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          return (
            <Box key={s.title} className="ladder-step">
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "stretch" }}>
                <Stack sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: accent,
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 13,
                      fontWeight: 800,
                      fontFamily: "var(--font-geist-mono)",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </Box>
                  {!isLast && (
                    <Box sx={{ width: 3, flex: 1, minHeight: 18, my: 0.5, borderRadius: 2, bgcolor: "divider" }} />
                  )}
                </Stack>
                <Box sx={{ pb: isLast ? 0 : 2 }}>
                  <Typography sx={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.4, pt: 0.5 }}>
                    {s.title}
                  </Typography>
                  {s.desc && (
                    <Typography sx={{ fontSize: 14, color: "text.secondary", lineHeight: 1.55, mt: 0.25 }}>
                      {s.desc}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
