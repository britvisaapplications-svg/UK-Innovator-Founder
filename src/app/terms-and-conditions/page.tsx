import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS } from "@/components/legal/termsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "The Terms and Conditions for UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, covering Innovator Founder endorsement and visa application services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      effectiveDate="25 June 2026"
      intro="UK Innovator Founder is operated by Shams Britvisa Lawyers Ltd, a UK immigration law firm authorised and regulated by the Immigration Advice Authority (IAA). Please read these Terms and Conditions carefully before using our website or purchasing our services."
      sections={TERMS}
    />
  );
}
