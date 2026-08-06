import type { Metadata } from "next";
import OfficePage from "@/components/office/OfficePage";

export const metadata: Metadata = {
  title: "Our Office",
  description:
    "Visit our Manchester office or work with us remotely. IAA-regulated UK immigration advice for the Innovator Founder route, serving clients worldwide.",
};

export default function OurOffice() {
  return <OfficePage />;
}
