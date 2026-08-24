import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { PRIVACY } from "@/components/legal/privacyContent";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Shams Britvisa Lawyers Ltd collects, uses, stores and protects your personal information when you use UK Innovator Founder and our UK immigration services.",
};

export default function PrivacyNoticePage() {
  return (
    <LegalPage
      title="Privacy Notice"
      effectiveDate="25 June 2026"
      intro="Shams Britvisa Lawyers Ltd is committed to protecting your privacy and handling your personal information fairly, lawfully and transparently. This notice explains how we collect, use, store, process and share your personal information when you use UK Innovator Founder and our UK immigration services."
      sections={PRIVACY}
    />
  );
}
