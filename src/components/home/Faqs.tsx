"use client";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/home/SectionHeading";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the Innovator Founder Visa?",
    a: "A UK immigration route for qualifying entrepreneurs seeking to establish and develop an innovative, viable and scalable UK business.",
  },
  {
    q: "Do I need an employer sponsor?",
    a: "No. The route relies on Innovator Founder endorsement rather than employer sponsorship.",
  },
  {
    q: "What if I do not have a business idea?",
    a: "Send your CV. We can assess your background and suggest up to 2-3 innovative business ideas based on your profile.",
  },
  {
    q: "What if I already have an idea?",
    a: "We can assess, refine and develop your existing concept towards an endorsable proposition.",
  },
  {
    q: "What does innovative mean?",
    a: "A genuine, original proposition that meets a market need or creates a meaningful competitive advantage.",
  },
  {
    q: "What does viable mean?",
    a: "A realistic plan in light of the founder's experience, resources and market understanding.",
  },
  {
    q: "What does scalable mean?",
    a: "Structured growth potential, including job creation and national or international expansion.",
  },
  {
    q: "How much does endorsement cost?",
    a: "The Endorsing Body charges an initial fee of £1,000 per person, paid directly to the Endorsing Body. This is separate from our professional fees, which depend on the package you choose.",
  },
  {
    q: "How long does endorsement take?",
    a: "Around 4-8 weeks is a useful planning range, but processing time sits with the Endorsing Body and is not guaranteed.",
  },
  {
    q: "How long is the endorsement letter valid?",
    a: "You have a 3-month window to use your endorsement for the visa application.",
  },
  {
    q: "Do I need £50,000?",
    a: "There is no fixed universal threshold, but your funding should match the needs of the venture.",
  },
  {
    q: "Do I need an MVP?",
    a: "Not necessarily; it depends on the business and its stage of development. MVP creation is included in our Premium package where useful.",
  },
  {
    q: "Can I work for another company?",
    a: "Eligible outside skilled employment is permitted alongside the business, subject to your visa conditions.",
  },
  {
    q: "Can I bring my family?",
    a: "Your eligible partner and children may apply as dependants.",
  },
  {
    q: "Can I get ILR after three years?",
    a: "Potentially, if the settlement requirements are met at the time of application.",
  },
  {
    q: "Do I have to meet my Endorsing Body after the visa is granted?",
    a: "Yes. Mandatory contact-point meetings take place around months 12 and 24 (£500 per meeting, paid directly to the Endorsing Body).",
  },
  {
    q: "Can I pay professional fees in instalments?",
    a: "Yes, under the agreed stage-payment plan, with an invoice and receipt at each stage.",
  },
];

/** §16, FAQs: all seventeen from the brief, as a single accordion column. */
export default function Faqs() {
  return (
    <Box id="faqs" component="section" sx={{ py: { xs: 6, md: 9 }, scrollMarginTop: 96 }}>
      <Container sx={{ maxWidth: "900px !important" }}>
        <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
        <Stack spacing={1.25}>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 6) * 40}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                  <Typography sx={{ fontWeight: 700, fontSize: 15.5 }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0 }}>
                  <Typography sx={{ fontSize: 15, color: "text.secondary", lineHeight: 1.65 }}>
                    {f.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Reveal>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
