import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { REGULATORY } from "@/components/legal/regulatoryContent";

export const metadata: Metadata = {
  title: "Our Registration Details",
  description:
    "Regulatory and registration details for UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, authorised and regulated by the Immigration Advice Authority (IAA).",
};

export default function RegistrationDetailsPage() {
  return (
    <LegalPage
      title="Our Registration Details"
      intro="UK Innovator Founder is operated by Shams Britvisa Lawyers Ltd, a UK immigration law firm authorised and regulated by the Immigration Advice Authority (IAA) and registered with the Information Commissioner's Office (ICO). This page sets out our regulatory status and professional responsibilities."
      sections={REGULATORY}
    />
  );
}
