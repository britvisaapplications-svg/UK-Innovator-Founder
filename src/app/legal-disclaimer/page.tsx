import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { DISCLAIMER } from "@/components/legal/disclaimerContent";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description:
    "The Legal Disclaimer for UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, covering the use of our website and UK immigration services.",
};

export default function LegalDisclaimerPage() {
  return (
    <LegalPage
      title="Legal Disclaimer"
      effectiveDate="25 June 2026"
      intro="The information contained on UK Innovator Founder is provided for general informational purposes only and does not constitute legal advice. Please read this Legal Disclaimer carefully before relying on any information published on this website."
      sections={DISCLAIMER}
    />
  );
}
