import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SITE_NAME, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Notice" };

const DRAFT =
  "Draft for review: this policy must be reviewed and approved by the firm's legal team before launch.";

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Privacy Notice"
      intro="How we collect, use and protect your personal data."
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Who we are",
          body: `${SITE_NAME} ("we", "us") provides business development and immigration support services relating to the UK Innovator Founder visa. We are the data controller for the personal data described in this policy. [Legal entity name, registered address and IAA registration number to be inserted.]`,
        },
        {
          heading: "What we collect",
          body: "When you use our Free CV & Profile Check we collect the details you provide: your name, contact details (email, WhatsApp/phone), country of residence, answers about your business plans and investment level, and your CV. When you engage us, we additionally collect the information needed to prepare your endorsement and visa application.",
        },
        {
          heading: "Why we process it (lawful basis)",
          body: "We process your enquiry details and CV to assess your suitability and respond to your request (steps taken at your request prior to entering a contract, UK GDPR Art. 6(1)(b)), and to provide our services once engaged (performance of a contract). Where we rely on consent, for example optional marketing updates, you can withdraw it at any time.",
        },
        {
          heading: "How CVs are stored",
          body: "CVs are uploaded over an encrypted connection and stored in private cloud storage that is not publicly reachable. Access is limited to authorised staff through an authenticated back office.",
        },
        {
          heading: "Retention",
          body: "If your enquiry does not proceed, your CV and enquiry details are deleted after [12 months, TBC]. If you become a client, records are retained for the period required by our regulatory obligations and then securely destroyed.",
        },
        {
          heading: "Sharing",
          body: "Your information is shared only where necessary to deliver the service, for example with the Endorsing Body handling your application and the Home Office as part of your visa application, and with our infrastructure providers (hosting, storage, email) under data-processing agreements. We never sell personal data.",
        },
        {
          heading: "Your rights",
          body: `You may request access to, correction of, or deletion of your personal data, object to or restrict processing, and request portability. Contact ${SUPPORT_EMAIL}. You also have the right to complain to the Information Commissioner's Office (ico.org.uk).`,
        },
      ]}
    />
  );
}
