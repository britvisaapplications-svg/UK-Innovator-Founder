import Hero from "@/components/home/Hero";
import JourneyOverview from "@/components/home/JourneyOverview";
import WhatIsIt from "@/components/home/WhatIsIt";
import Benefits from "@/components/home/Benefits";
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
 * Homepage, the full interactive founder journey, in the order set by the
 * client's brief (sections 2-17). Anchor ids on each section line up with
 * the main nav and the hero's coloured tiles.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <JourneyOverview />
      <WhatIsIt />
      <Benefits />
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
