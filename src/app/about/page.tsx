import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { IAA_NOTE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="Company"
      title="About Us"
      intro="We turn strong professional profiles into endorsable UK businesses."
      draftNotice="Placeholder copy: final wording, entity details and history to be supplied by the client."
      sections={[
        {
          heading: "What we do",
          body: `${SITE_NAME} supports international entrepreneurs through the UK Innovator Founder route end-to-end: profile assessment, business idea development, market research, business plans and financial models, endorsement applications, interview preparation and the visa application itself.`,
        },
        {
          heading: "How we're different",
          body: "You don't need a business idea to start. We assess your CV and, where appropriate, suggest up to 2-3 innovative business ideas matched to your experience, then develop the one you choose into a proposition an Endorsing Body can assess.",
        },
        {
          heading: "Regulated support",
          body: IAA_NOTE,
        },
      ]}
    />
  );
}
