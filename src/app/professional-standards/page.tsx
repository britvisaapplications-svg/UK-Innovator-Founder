import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { IAA_NOTE } from "@/lib/site";

export const metadata: Metadata = { title: "Professional Standards" };

const DRAFT =
  "Draft for review: IAA registration details and the firm's standards commitments must be confirmed before launch.";

export default function ProfessionalStandardsPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Professional Standards"
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Regulated immigration advice",
          body: `${IAA_NOTE} [IAA registration number and level to be inserted.] The IAA Code of Standards governs how regulated advisers must act.`,
        },
        {
          heading: "Honest, evidence-led advice",
          body: "We give realistic assessments, including telling you when the Innovator Founder route is not right for your circumstances. We never promise outcomes that rest with the Endorsing Body or the Home Office.",
        },
        {
          heading: "Transparent fees",
          body: "Fees are agreed in writing before work starts, split into stage payments, and always shown separately from Endorsing Body and Home Office fees.",
        },
        {
          heading: "Confidentiality",
          body: "Your information is handled in line with our Privacy Policy and used only to deliver the services you engage us for.",
        },
      ]}
    />
  );
}
