import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InfoPage from "@/components/InfoPage";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Help & client"
      title="Contact Us"
      intro="The fastest way to start is the Free CV & Profile Check, or reach us directly."
      sections={[
        {
          heading: "Email",
          body: SUPPORT_EMAIL,
        },
        {
          heading: "Phone / WhatsApp",
          body: `${SUPPORT_PHONE} [numbers to be confirmed by the client]`,
        },
        {
          heading: "Existing clients",
          body: "Use your case tracking number on the Case Tracker page for a live status update, or contact your caseworker directly.",
        },
      ]}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3, justifyContent: "center" }}>
        <Button href="/#free-cv-check" variant="contained" size="large">
          Get your free CV check
        </Button>
        <Button href="/case-tracker" variant="outlined" color="secondary" size="large">
          Track your case
        </Button>
      </Stack>
    </InfoPage>
  );
}
