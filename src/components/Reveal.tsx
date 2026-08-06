"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

/**
 * Reveal-on-scroll wrapper. Children start hidden (see .reveal in
 * globals.css) and animate in the first time they enter the viewport.
 * Respects prefers-reduced-motion via the CSS.
 *
 * `delay` staggers siblings; `direction="left"` slides in from the left
 * (used for the hero benefit chips' left-to-right sweep).
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  sx,
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left";
  sx?: SxProps<Theme>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      className={`reveal${direction === "left" ? " reveal-left" : ""}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      sx={sx}
    >
      {children}
    </Box>
  );
}
