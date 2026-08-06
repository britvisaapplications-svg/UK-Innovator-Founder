import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

const DRAFT =
  "Draft for review: these terms must be reviewed and approved by the firm's legal team before launch, including the exact conditions for free re-application and third-party fee coverage.";

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Terms & Conditions"
      intro="The terms on which we provide our services."
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Our service",
          body: `${SITE_NAME} provides business development and application-preparation support for the UK Innovator Founder route: profile assessment, business idea development, market research, business plans and financial models, validation work depending on package, and preparation of endorsement and visa applications. Immigration work is handled or supervised by IAA-regulated immigration lawyers.`,
        },
        {
          heading: "No guaranteed outcomes",
          body: "Endorsement decisions are made solely by the relevant Endorsing Body and visa decisions solely by the Home Office. We do not and cannot guarantee endorsement, visa grant, or settlement (ILR). Any timeframes we quote (for example a 4-8 week endorsement assessment) are indicative planning guides only.",
        },
        {
          heading: "Fees and instalments",
          body: "Professional fees depend on the package selected (Basic, Standard or Premium) and are agreed in writing before work begins. Fees may be paid in agreed instalments; an invoice and receipt are issued at each stage. Professional fees are separate from Endorsing Body fees (currently £1,000 initial assessment and £500 per contact-point meeting, paid directly to the Endorsing Body) and from Home Office fees.",
        },
        {
          heading: "Free re-application",
          body: "Standard and Premium packages include a free re-application where the initial endorsement application is unsuccessful, subject to the qualifying conditions set out in your service agreement. [Exact qualifying conditions and which third-party fees are covered to be supplied by the firm.]",
        },
        {
          heading: "Client responsibilities",
          body: "You agree to provide accurate, complete and timely information, to stay actively involved in the development of your proposition (including interview preparation), and to inform us promptly of any material changes to your circumstances.",
        },
        {
          heading: "Liability",
          body: "[Limitation of liability wording to be supplied and approved by the firm's legal team.]",
        },
      ]}
    />
  );
}
