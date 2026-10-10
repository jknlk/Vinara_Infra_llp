import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import WhyChooseVinara from "@/components/about/WhyChooseVinara";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhyVinaraValues from "@/components/about/WhyVinaraValues";
import ExecutionApproach from "@/components/about/ExecutionApproach";
import MissionVision from "@/components/about/MissionVision";
import FounderQuote from "@/components/about/FounderQuote";
import QhseCommitment from "@/components/about/QhseCommitment";

export const metadata: Metadata = {
  title: "About — Vinara Infra LLP",
  description: "Who Vinara Infra LLP is, our core expertise, execution approach and QHSE commitment.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <div id="about-body" />

      <WhyChooseVinara />

      <MissionVision />

      <FounderQuote />

      <WhoWeAre />

      <ExecutionApproach />

      <WhyVinaraValues />

      <QhseCommitment />
    </>
  );
}
