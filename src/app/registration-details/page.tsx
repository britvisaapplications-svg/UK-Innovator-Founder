import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { IAA_NOTE, SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

export const metadata: Metadata = { title: "Our Registration Details" };

const DRAFT =
  "Draft for review: the legal entity name, company number, IAA registration number and registered office must be supplied by the firm before launch.";

export default function RegistrationDetailsPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Our Registration Details"
      intro="Who we are and how we are regulated."
      draftNotice={DRAFT}
      sections={[
        {
          heading: "Legal entity",
          body: "[Legal/trading entity name, company registration number and country of incorporation to be inserted.]",
        },
        {
          heading: "Immigration Advice Authority (IAA) registration",
          body: `${IAA_NOTE} [IAA registration number and authorisation level to be inserted.] The IAA register can be checked at gov.uk.`,
        },
        {
          heading: "Registered office",
          body: "[Registered office address to be inserted.]",
        },
        {
          heading: "Contact",
          body: `${SUPPORT_EMAIL} · ${SUPPORT_PHONE}`,
        },
      ]}
    />
  );
}
