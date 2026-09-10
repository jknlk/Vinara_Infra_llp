import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import DataPanel from "@/components/ui/DataPanel";
import { IMAGES } from "@/data/images";
import {
  CORE_EXPERTISE,
  EXECUTION_STEPS,
  WHY_VINARA,
  QHSE_COMMITMENT,
  PROJECT_STRENGTH,
  CORE_VALUES,
} from "@/data/content/about";

export const metadata: Metadata = {
  title: "About — Vinara Infra LLP",
  description: "Who Vinara Infra LLP is, our core expertise, execution approach and QHSE commitment.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Building today. Empowering tomorrow."
        image={IMAGES.heroAerial}
        imageSlot="hero-aerial"
      />

      {/* S2 · Who we are */}
      <section className="bg-paper py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-label uppercase tracking-[0.08em] text-grey-500">Bengaluru, Karnataka</p>
            <SectionHead
              tone="light"
              title="Who we are"
              standfirst="We deliver high-quality, technology-driven construction solutions with a strong focus on safety, efficiency and long-term value. Strong partnerships. Timely delivery. Lasting impact."
              className="mt-4"
            />
          </div>
        </Container>
      </section>

      {/* S3 · Core expertise */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Core expertise" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_EXPERTISE.map((c) => (
              <DataPanel key={c.title}>
                <h3 className="text-body-l font-display font-bold text-white">{c.title}</h3>
                <ul className="mt-4 space-y-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-caption text-grey-300">
                      {item}
                    </li>
                  ))}
                </ul>
              </DataPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* S4 · Execution approach */}
      <section className="bg-paper py-24">
        <Container>
          <SectionHead tone="light" title="Execution approach" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {EXECUTION_STEPS.map((s) => (
              <div key={s.n} className="border-t border-[#E3EAF4] pt-4">
                <span className="tabular text-caption font-semibold text-grey-500">{String(s.n).padStart(2, "0")}</span>
                <h3 className="mt-2 text-body-l font-display font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-body text-grey-500">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* S5 · Why Vinara */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Why Vinara" />
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_VINARA.map((w) => (
              <li key={w} className="rounded-xl border border-navy-500 bg-navy-900 px-5 py-4 text-body font-medium text-white">
                {w}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* S6 · QHSE commitment */}
      <section className="border-y border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="QHSE commitment" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {QHSE_COMMITMENT.map((q) => (
              <div key={q.title}>
                <h3 className="text-body-l font-display font-bold text-sky-200">{q.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{q.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* S7 · Project strength & values */}
      <section className="bg-ink py-24">
        <Container className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead title="Project strength" />
            <div className="mt-8 space-y-5">
              {PROJECT_STRENGTH.map((p) => (
                <div key={p.title} className="flex items-baseline justify-between border-b border-navy-500 pb-3">
                  <span className="text-body font-medium text-white">{p.title}</span>
                  <span className="text-caption text-grey-300">{p.body}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <SectionHead title="Our values" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {CORE_VALUES.map((v) => (
                <DataPanel key={v.title} accent="var(--color-sky-400)">
                  <h3 className="text-body-l font-display font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-caption text-grey-300">{v.body}</p>
                </DataPanel>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
