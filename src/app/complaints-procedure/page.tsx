import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { COMPLAINTS } from "@/components/legal/complaintsContent";

export const metadata: Metadata = {
  title: "Complaints Policy",
  description:
    "How UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, handles complaints fairly, promptly and transparently.",
};

export default function ComplaintsPage() {
  return (
    <LegalPage
      title="Complaints Policy"
      effectiveDate="25 June 2026"
      intro="At UK Innovator Founder, we are committed to providing a professional, efficient and courteous service. We recognise that, from time to time, concerns may arise. We take all complaints seriously and aim to resolve them fairly, promptly and transparently. UK Innovator Founder is operated by Shams Britvisa Lawyers Ltd (SBVL), a registered UK immigration law firm."
      sections={COMPLAINTS}
    />
  );
}
