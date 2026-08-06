import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Refund & Cancellation Policy" };

const DRAFT =
  "Draft for review: refund conditions must be finalised and approved by the firm's legal team before launch.";

export default function RefundPolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Refund & Cancellation Policy"
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Stage payments",
          body: "Professional fees are payable in agreed instalments tied to stages of work, with an invoice and receipt at each stage. You only pay for the stage of work in progress.",
        },
        {
          heading: "Cancellation by you",
          body: "You may cancel at any time in writing. Fees for stages already completed, and work in progress up to the date of cancellation, remain payable. [Cooling-off terms for consumer contracts to be confirmed by the firm's legal team.]",
        },
        {
          heading: "Third-party fees",
          body: "Endorsing Body fees and Home Office fees are paid directly to those organisations and are subject to their own refund rules, they are not refundable by us.",
        },
        {
          heading: "Unsuccessful applications",
          body: "An unsuccessful endorsement application is not, by itself, grounds for a refund, outcomes rest with the Endorsing Body. Standard and Premium packages instead include a free re-application subject to the qualifying conditions in your service agreement.",
        },
      ]}
    />
  );
}
