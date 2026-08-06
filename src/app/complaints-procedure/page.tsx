import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Complaints Policy" };

const DRAFT =
  "Draft for review: the IAA requires an approved complaints procedure; this text must be finalised against the firm's IAA obligations before launch.";

export default function ComplaintsPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Complaints Policy"
      intro="If something has gone wrong, we want to put it right."
      draftNotice={DRAFT}
      sections={[
        {
          heading: "How to complain",
          body: `Contact us at ${SUPPORT_EMAIL} with "Complaint" in the subject line, or write to our office address. Please include your name, your case tracking number if you have one, and a description of the issue.`,
        },
        {
          heading: "What happens next",
          body: "We will acknowledge your complaint within [5 working days, TBC], investigate it, and provide a written response within [14/28 days, TBC]. Where a complaint is upheld we will explain the remedy we propose.",
        },
        {
          heading: "Escalation to the IAA",
          body: "Immigration advice in the UK is regulated by the Immigration Advice Authority (IAA). If you are not satisfied with our response, you may complain directly to the IAA. Details of the IAA complaints scheme are available at gov.uk (search \"complain about an immigration adviser\").",
        },
      ]}
    />
  );
}
