/**
 * Site-wide constants: brand, contact details and navigation structure.
 *
 * ⚠️ Placeholders to confirm with the client before launch:
 *   - SITE_NAME / legal entity name
 *   - SUPPORT_EMAIL / PHONE / WHATSAPP
 *   - IAA registration number and office address (footer regulatory strip)
 */

export const SITE_NAME = "UK Innovator Founder";
export const SITE_TAGLINE = "Your idea, refined for endorsement";
/**
 * Shown publicly on the site and in every email footer. This is the firm's
 * own inbox, not an address on the site's domain: 3year-ilr.uk is set up in
 * Resend for *sending* only, and ukinnovatorfounder.uk is not a domain the
 * firm holds at all, so mail to either would bounce.
 */
export const SUPPORT_EMAIL = "info@shamsbvlawyers.com";
export const SUPPORT_PHONE = "+44 7776 668557"; // firm number, from eVisaPortal

/** WhatsApp contact (digits only), same firm number as eVisaPortal. */
export const WHATSAPP_NUMBER = "447776668557";

export function whatsappHref(
  message = "Hello, I would like a free CV & profile check for the UK Innovator Founder visa.",
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Office details, shared with the firm's existing Manchester office. */
export const OFFICE = {
  addressLines: [
    "Shams Britvisa Lawyers Ltd",
    "291 Slade Lane",
    "Manchester",
    "M19 2HR",
    "United Kingdom",
  ],
  phoneDisplay: "+44 7776 668557",
  mapsQuery: "291+Slade+Lane,+Manchester,+M19+2HR",
  iaaRef: "F202200117",
  companyNo: "14182242",
} as const;
export const IAA_NOTE =
  "Immigration work is handled and supervised by IAA-regulated immigration lawyers experienced in UK immigration matters."; // registration number TBC

/** Top utility banner links (above the main nav). */
export const UTILITY_LINKS = [
  { label: "Our Team", href: "/team" },
  { label: "Our Office", href: "/our-office" },
  { label: "Approved Cases", href: "/approved-cases" },
  { label: "Case Tracker", href: "/case-tracker" },
] as const;

/**
 * Coloured section tiles in the hero, the site's section navigation
 * (the header deliberately carries only the four utility links). Full-width
 * stacked bars per the client's page-1 mockup; each smooth-scrolls to its
 * homepage section. `color` is the bar colour, text is always white.
 */
export const SECTION_TILES = [
  { label: "What Is It?", id: "what-is-it", color: "#3b5bab" },
  { label: "Three-Year Journey", id: "three-year-journey", color: "#3d8b6e" },
  { label: "Eligibility", id: "eligibility", color: "#cf9c2f" },
  { label: "Endorsement Process", id: "endorsement-process", color: "#7d55b8" },
  { label: "Timeline", id: "timeline", color: "#d96f45" },
  { label: "Why Applications Fail", id: "why-applications-fail", color: "#c0504d" },
  { label: "Packages & Fees", id: "packages", color: "#3a6f96" },
  { label: "FAQs", id: "faqs", color: "#697077" },
] as const;

/** Footer links, legal & compliance only; everything else lives in the header/hero. */
export const LEGAL_LINKS: { label: string; href: string }[] = [
  { label: "Privacy Notice", href: "/privacy-notice" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Complaints Policy", href: "/complaints-procedure" },
  { label: "Our Registration Details", href: "/registration-details" },
  { label: "Legal Disclaimer", href: "/legal-disclaimer" },
  { label: "Refund & Cancellation Policy", href: "/refund-cancellation-policy" },
];

/** Investment budget options for the lead form. */
export const INVESTMENT_OPTIONS = [
  "Under £10,000",
  "£10,000–£25,000",
  "£25,000–£50,000",
  "£50,000+",
  "Not sure yet",
] as const;
