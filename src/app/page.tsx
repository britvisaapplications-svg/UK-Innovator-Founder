import Hero from "@/components/home/Hero";
import WhatIsIt from "@/components/home/WhatIsIt";
import Eligibility from "@/components/home/Eligibility";
import EndorsementLadder from "@/components/home/EndorsementLadder";
import PrepTimeline from "@/components/home/PrepTimeline";
import EndorsingBodies from "@/components/home/EndorsingBodies";
import WhyFail from "@/components/home/WhyFail";
import WhyDifferent from "@/components/home/WhyDifferent";
import Packages from "@/components/home/Packages";
import AfterVisa from "@/components/home/AfterVisa";
import Faqs from "@/components/home/Faqs";

/**
 * Homepage, the full interactive founder journey. Per the client's
 * 2026-10-03 review, nothing is said twice: benefits live only in the hero
 * tick-list, the step-by-step process only in the 12-step journey, and
 * durations only in the Timeline. Anchor ids on each section line up with
 * the main nav and the hero's coloured tiles.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhatIsIt />
      <Eligibility />
      <EndorsementLadder />
      <PrepTimeline />
      <EndorsingBodies />
      <WhyFail />
      <WhyDifferent />
      <Packages />
      <AfterVisa />
      <Faqs />
    </>
  );
}
