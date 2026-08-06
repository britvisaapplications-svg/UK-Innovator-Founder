import type { Metadata } from "next";
import TeamPage from "@/components/team/TeamPage";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet our IAA-regulated UK immigration advisers supporting you through the Innovator Founder journey, from business idea to endorsement and visa application.",
};

export default function Team() {
  return <TeamPage />;
}
