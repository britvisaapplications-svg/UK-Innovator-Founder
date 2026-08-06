import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Anti-Fraud Policy" };

const DRAFT =
  "Draft for review: this policy must be reviewed and approved by the firm's legal team before launch.";

export default function AntiFraudPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Anti-Fraud Policy"
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Zero tolerance",
          body: "We operate a zero-tolerance approach to fraud. We will not prepare, submit or support applications containing false statements, fabricated evidence or misleading information, and we will decline or terminate engagements where this is requested.",
        },
        {
          heading: "Genuine propositions only",
          body: "Business plans, market research, financial models and validation evidence we prepare are based on information you provide and research we conduct. You are responsible for the accuracy of the information you give us; documents we produce must genuinely reflect your intentions and capability.",
        },
        {
          heading: "Protect yourself",
          body: `We never ask for payment to personal accounts, and official fees are always paid directly to the Endorsing Body or the Home Office. If you receive a suspicious request claiming to be from us, contact ${SUPPORT_EMAIL} before paying anything.`,
        },
        {
          heading: "Reporting",
          body: "Suspected fraud involving our name or services can be reported to us and to Action Fraud (actionfraud.police.uk).",
        },
      ]}
    />
  );
}
