import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { REFUND } from "@/components/legal/refundContent";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "The Refund & Cancellation Policy for UK Innovator Founder, operated by Shams Britvisa Lawyers Ltd, covering Innovator Founder endorsement and visa application services.",
};

export default function RefundCancellationPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      effectiveDate="25 June 2026"
      intro="This Refund & Cancellation Policy applies to all immigration advice, administrative support and related services provided through UK Innovator Founder in connection with the Innovator Founder route. UK Innovator Founder is owned and operated by Shams Britvisa Lawyers Ltd, authorised and regulated by the Immigration Advice Authority (IAA). It should be read together with our Terms and Conditions, Client Care provisions and Privacy Notice."
      sections={REFUND}
    />
  );
}
