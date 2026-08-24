import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { COOKIES } from "@/components/legal/cookieContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, uses cookies and similar technologies when you visit or use our website.",
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      effectiveDate="25 June 2026"
      intro="This Cookie Policy explains how UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, uses cookies and similar technologies when you visit or use our website. It should be read together with our Privacy Notice."
      sections={COOKIES}
    />
  );
}
