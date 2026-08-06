"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single GSAP entry point: plugins registered once, shared everywhere.
 *
 * Convention: every animation is created inside
 * `gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", ...)`
 * so reduced-motion users simply get the fully-visible static layout.
 */
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
