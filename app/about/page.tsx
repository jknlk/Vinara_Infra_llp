import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import { IMAGES } from "@/data/images";
import {
  CORE_EXPERTISE,
  EXECUTION_STEPS,
  WHY_VINARA,
  QHSE_COMMITMENT,
  CORE_VALUES,
} from "@/data/content/about";

export const metadata: Metadata = {
  title: "About — Vinara Infra LLP",
  description: "Who Vinara Infra LLP is, our core expertise, execution approach and QHSE commitment.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Photo mosaic */}
      <section id="about-body" className="bg-white pt-24">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl">
              <SiteImage slot="about-m1" image={IMAGES.galleryCityCranes} ratio="auto" className="h-full min-h-[320px] w-full" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <SiteImage slot="about-m2" image={IMAGES.galleryPrecastLift} ratio="1/1" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <SiteImage slot="about-m3" image={IMAGES.showcaseRacking} ratio="1/1" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <SiteImage slot="about-m4" image={IMAGES.portraitHardHatWorker} ratio="1/1" />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <SiteImage slot="about-m5" image={IMAGES.showcaseScaffold} ratio="1/1" />
            </div>
          </div>
        </Container>
      </section>

      {/* Who we are + expertise */}
      <section className="bg-white py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <p className="text-label uppercase tracking-[0.14em] text-[#3e86d0]">Who we are</p>
            <h2 className="mt-4 font-display text-display-md text-[#0f2b57]">
              Strong partnerships. Timely delivery. Lasting impact.
            </h2>
            <p className="mt-6 text-body text-[#5a6b84]">
              Based in Bengaluru, we deliver high-quality construction with a strong focus on safety, efficiency and
              long-term value.
            </p>
          </div>
          <div className="lg:col-span-8">
            {CORE_EXPERTISE.map((c, i) => (
              <div
                key={c.title}
                className="grid grid-cols-1 gap-4 border-t border-[#0f2b57]/15 py-8 first:border-t-0 first:pt-0 md:grid-cols-12"
              >
                <span className="tabular text-caption font-semibold text-[#3e86d0] md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-body-l font-bold text-[#0f2b57] md:col-span-5">{c.title}</h3>
                <ul className="space-y-1 text-body text-[#5a6b84] md:col-span-6">
                  {c.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Execution approach */}
      <section className="bg-[#0f2b57] py-24 text-white">
        <Container>
          <p className="text-label uppercase tracking-[0.14em] text-[#7fb6e8]">Execution approach</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-md">From first plan to final handover.</h2>
          <ol className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {EXECUTION_STEPS.map((s) => (
              <li key={s.n} className="border-t border-white/25 pt-6">
                <span className="tabular font-display text-display-md text-[#7fb6e8]">
                  {String(s.n).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-body-l font-bold">{s.title}</h3>
                <p className="mt-2 text-body text-white/75">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Founder quote */}
      <section className="bg-[#f2f7fc] py-24">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-display text-6xl leading-none text-[#3e86d0]/40">&ldquo;</span>
            <p className="mt-2 font-display text-2xl font-medium leading-snug text-[#0f2b57] md:text-3xl">
              Every project we take on is a promise — to build safely, to build well, and to
              hand over something our clients can rely on for decades.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#3e86d0]" />
              <div className="text-left">
                <p className="font-display text-body font-bold text-[#0f2b57]">Rajat V Panchal</p>
                <p className="text-caption text-[#5a6b84]">Director &amp; Managing Director, Vinara Infra LLP</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Vinara + values */}
      <section className="bg-white py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-[#3e86d0]">Why Vinara</p>
            <ul className="mt-8 divide-y divide-[#0f2b57]/15 border-y border-[#0f2b57]/15">
              {WHY_VINARA.map((w) => (
                <li key={w} className="flex items-center gap-4 py-5 font-display text-body-l font-bold text-[#0f2b57]">
                  <span className="h-2 w-2 rounded-full bg-[#3e86d0]" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-label uppercase tracking-[0.14em] text-[#3e86d0]">Our values</p>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-[#0f2b57]/15 sm:grid-cols-2">
              {CORE_VALUES.map((v) => (
                <div key={v.title} className="bg-[#f2f7fc] p-8">
                  <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{v.title}</h3>
                  <p className="mt-2 text-body text-[#5a6b84]">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* QHSE */}
      <section className="bg-[#0b2247] py-24 text-white">
        <Container>
          <p className="text-label uppercase tracking-[0.14em] text-[#7fb6e8]">QHSE commitment</p>
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
