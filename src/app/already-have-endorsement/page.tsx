import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Already Have Endorsement?" };

export default function AlreadyHaveEndorsementPage() {
  return (
    <InfoPage
      eyebrow="Help & client"
      title="Already Have Endorsement?"
      intro="If an Endorsing Body has already endorsed your business, we can take you from endorsement letter to submitted visa application."
      sections={[
        {
          heading: "The 3-month window",
          body: "Your endorsement must be used for the visa application within 3 months of being issued. Timing matters. We prepare the application, supporting documents and submission to the Home Office within that window.",
        },
        {
          heading: "What we handle",
          body: "Visa document preparation, application form completion, dependant applications where eligible, and guidance through biometrics and decision, handled or supervised by IAA-regulated immigration lawyers.",
        },
        {
          heading: "After the visa",
          body: "We can also support your 12- and 24-month Endorsing Body contact-point meetings and the journey towards potential settlement.",
        },
      ]}
    >
      <Stack direction="row" sx={{ mt: 3, justifyContent: "center" }}>
        <Button href="/contact" variant="contained" size="large">
          Talk to us about your endorsement
        </Button>
      </Stack>
    </InfoPage>
  );
}
