import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";
import { SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = { title: "Cookie Policy" };

const DRAFT =
  "Draft for review: update this policy whenever analytics or marketing tags are added, and pair it with a consent banner at that point.";

export default function CookiePolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal & compliance"
      title="Cookie Policy"
      intro="What cookies this website uses and why."
      draftNotice={DRAFT}
      sections={[
        {
          heading: "What cookies are",
          body: "Cookies are small text files placed on your device by a website. They help the site work properly and can also be used to measure how the site is used.",
        },
        {
          heading: "Cookies we use",
          body: "This website currently uses only essential cookies, for example, the session cookie that keeps authorised staff signed in to the back office. Essential cookies do not require consent. We do not currently set analytics or marketing cookies. If that changes, this policy will be updated and a consent banner introduced before any non-essential cookies are set.",
        },
        {
          heading: "Managing cookies",
          body: "You can block or delete cookies through your browser settings at any time. Blocking essential cookies may stop parts of the site (such as the back office sign-in) from working.",
        },
        {
          heading: "Questions",
          body: `Contact ${SUPPORT_EMAIL} with any questions about this policy.`,
        },
      ]}
    />
  );
}
