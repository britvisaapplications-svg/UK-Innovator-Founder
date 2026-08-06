import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Approved Cases" };

export default function ApprovedCasesPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="Approved Cases"
      intro="Anonymised examples of endorsements and visas our clients have secured."
      draftNotice="Placeholder: anonymised case studies to be supplied by the client. Outcomes shown will always be historical examples, not a promise of future results."
      sections={[
        {
          heading: "Coming soon",
          body: "We are preparing anonymised case studies covering the founder's background, the business idea developed, the endorsement journey and the outcome. Each will note the package used and the timeline involved.",
        },
      ]}
    />
  );
}
