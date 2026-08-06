"use client";

import { useRouter } from "next/navigation";

/**
 * Shared behavior for every "Free CV Check" call-to-action.
 *
 * A plain `/#free-cv-check` hash link gives no visible feedback on desktop,
 * where the form already sits above the fold. Instead the CTA scrolls the
 * form into view, pulses a crimson glow around it and focuses the first
 * field, so the click always visibly responds. From other pages it
 * navigates home first; the hero re-runs the pulse on arrival.
 */
export function pulseLeadForm(): boolean {
  const el = document.getElementById("free-cv-check");
  if (!el) return false;

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Restart the glow animation even on repeat clicks.
  el.classList.remove("form-pulse");
  void el.offsetWidth;
  el.classList.add("form-pulse");

  window.setTimeout(() => {
    el.querySelector<HTMLInputElement>('input:not([type="hidden"]):not([type="file"])')?.focus({
      preventScroll: true,
    });
  }, 650);
  return true;
}

/** Click handler for CTA buttons: pulse in place, or navigate home first. */
export function useLeadFormCta(): (e?: { preventDefault: () => void }) => void {
  const router = useRouter();
  return (e) => {
    e?.preventDefault();
    if (!pulseLeadForm()) router.push("/#free-cv-check");
  };
}
