import type { Metadata } from "next";
import CaseTracker from "@/components/track/CaseTracker";

export const metadata: Metadata = {
  title: "Case Tracker",
  description:
    "Track your Innovator Founder endorsement application through all 7 stages with your case tracking number.",
};

export default function CaseTrackerPage() {
  return <CaseTracker />;
}
