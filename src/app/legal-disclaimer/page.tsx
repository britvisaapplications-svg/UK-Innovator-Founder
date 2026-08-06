import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Legal Disclaimer" };

const DRAFT =
  "Draft for review: this disclaimer must be reviewed and approved by the firm's legal team before launch.";

export default function DisclaimerPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Legal Disclaimer"
      draftNotice={DRAFT}
      sections={[
        {
          heading: "General information only",
          body: "The content of this website is provided for general information about the UK Innovator Founder route and our services. It is not legal advice and should not be relied on as such. Advice on your specific circumstances is provided only under a signed service agreement.",
        },
        {
          heading: "No guaranteed outcomes",
          body: "Endorsement decisions rest with the relevant Endorsing Body; visa and settlement decisions rest with the Home Office. References to potential outcomes, including potential ILR after three years, are subject to the requirements in force at the time of application and are never guaranteed.",
        },
        {
          heading: "Accuracy and changes",
          body: "Immigration Rules, fees and Endorsing Body arrangements change. While we keep this site under review, we do not warrant that all content is current at the moment you read it. Figures such as Endorsing Body fees and processing times are indicative.",
        },
        {
          heading: "Third parties",
          body: "References to Endorsing Bodies or other third parties do not imply their endorsement of this website or our services.",
        },
      ]}
    />
  );
}
