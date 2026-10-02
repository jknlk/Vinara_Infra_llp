import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import WhyChooseVinara from "@/components/about/WhyChooseVinara";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhyVinaraValues from "@/components/about/WhyVinaraValues";
import ExecutionApproach from "@/components/about/ExecutionApproach";
import Container from "@/components/ui/Container";
import { QHSE_COMMITMENT, MISSION_VISION } from "@/data/content/about";

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

      {/* Mission & Vision */}
      <section className="bg-[#f2f7fc] py-24">
        <Container>
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">Mission &amp; Vision</p>
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-[#0f2b57]/15 pt-10 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-body-l font-bold text-[#0f2b57]">Our Mission</h3>
              <p className="mt-3 max-w-xl text-body text-[#5a6b84]">{MISSION_VISION.mission}</p>
            </div>
            <div>
              <h3 className="font-display text-body-l font-bold text-[#0f2b57]">Our Vision</h3>
              <p className="mt-3 max-w-xl text-body text-[#5a6b84]">{MISSION_VISION.vision}</p>
            </div>
          </div>
        </Container>
      </section>

      <WhoWeAre />

      <ExecutionApproach />

      <WhyVinaraValues />

      {/* QHSE */}
      <section className="bg-[#0b2247] py-24 text-white">
        <Container>
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
            Quality, Health, Safety &amp; Environment (QHSE) Commitment
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {QHSE_COMMITMENT.map((q) => (
              <div key={q.title} className="border-l-2 border-[#3e86d0] pl-5">
                <h3 className="font-display text-body-l font-bold">{q.title}</h3>
                <p className="mt-2 text-caption text-white/75">{q.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
