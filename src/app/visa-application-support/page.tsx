import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Visa Application Support" };

export default function VisaApplicationSupportPage() {
  return (
    <InfoPage
      eyebrow="Help & client"
      title="Visa Application Support"
      intro="Stage 2 of the journey: from endorsement letter to Home Office decision."
      sections={[
        {
          heading: "What's included",
          body: "Preparation of the Innovator Founder visa application, the supporting document bundle, dependant applications where eligible, and submission to the Home Office, with guidance through biometrics and any follow-up requests.",
        },
        {
          heading: "Who handles it",
          body: "Immigration work is handled or supervised by IAA-regulated immigration lawyers experienced in UK immigration matters.",
        },
        {
          heading: "Fees",
          body: "Our professional fees are always shown separately from Home Office fees (application fee and Immigration Health Surcharge), which you pay directly to the Home Office.",
        },
      ]}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3, justifyContent: "center" }}>
        <Button href="/#free-cv-check" variant="contained" size="large">
          Start with a free CV check
        </Button>
        <Button href="/already-have-endorsement" variant="outlined" color="secondary" size="large">
          Already endorsed?
        </Button>
      </Stack>
    </InfoPage>
  );
}
