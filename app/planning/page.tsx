import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, Check, FileCheck2 } from "lucide-react";
import { IMAGES } from "@/data/images";
import { CONTROLS_COMMITMENT, DELIVERY_STAGES } from "@/data/content/planning";

export const metadata: Metadata = {
  title: "Controls & QHSE — Vinara Infra LLP",
  description:
    "How Vinara controls every project, step by step: preconstruction, planning, quality, safety, progress monitoring and handover.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";
const num = (i: number) => String(i + 1).padStart(2, "0");

export default function PlanningPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#071a3a] text-white">
        <Image
          src={IMAGES.planningHero.src ?? ""}
          alt={IMAGES.planningHero.alt}
          fill
          priority
          sizes="100vw"
          className="hero-zoom object-cover object-[68%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071a3a] via-[#071a3a]/80 to-[#071a3a]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071a3a] via-[#071a3a]/25 to-[#071a3a]/50" />

        <div className="relative mx-auto flex w-full max-w-[1680px] flex-1 flex-col px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <div className="flex flex-1 flex-col justify-center lg:w-9/12">
            <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
              <span className="h-px w-10 bg-[#7fb6e8]" />
              Controls &amp; QHSE
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,min(6.4vw,11.5vh),6rem)] font-extrabold leading-[0.96] tracking-[-0.03em]">
              Planned before we build.
              <span className="block join-shine join-shine-dark pb-[0.08em]">Controlled until handover.</span>
            </h1>
            <p className="mt-6 max-w-[52ch] border-l-2 border-[#4d94ff] pl-5 text-body-l text-white/75">
              Every Vinara project follows the same six controlled stages. Here is what we do at each one, and the
              records you receive as proof.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#stages"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#1f6fd1] px-7 py-3.5 text-body font-semibold text-white shadow-lg shadow-[#1f6fd1]/30 transition-colors hover:bg-[#4d94ff]"
              >
                See how we work
                <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-3 xl:grid-cols-6">
            {DELIVERY_STAGES.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group block">
                  <span className="tabular font-display text-3xl font-extrabold leading-none text-[#7fb6e8] md:text-4xl">
                    {num(i)}
                  </span>
                  <span className="mt-2 block text-body font-semibold text-white/85 group-hover:text-white">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The six stages, in delivery order */}
      <section id="stages" className="bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
            <span className="h-px w-10 bg-[#3e86d0]" />
            How we deliver
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            Six stages, <span className="join-shine">one controlled process.</span>
          </h2>

          <ol className="mt-10 space-y-6 md:mt-14 md:space-y-8">
            {DELIVERY_STAGES.map((s, i) => {
              const img = IMAGES[s.image];
              return (
                <li
                  key={s.id}
                  id={s.id}
                  className="grid scroll-mt-28 grid-cols-1 overflow-hidden rounded-3xl border border-[#dbe9fa] bg-gradient-to-br from-white to-[#f3f8ff] lg:grid-cols-12"
                >
                  <div className={`relative min-h-[220px] lg:col-span-4 ${i % 2 ? "lg:order-last" : ""}`}>
                    <Image src={img.src ?? ""} alt={img.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                    <span className="tabular absolute left-5 top-4 font-display text-6xl font-extrabold text-white drop-shadow-lg">
                      {num(i)}
                    </span>
                  </div>

                  <div className="p-6 sm:p-8 lg:col-span-8">
                    <p className={`${eyebrow} text-[#3e86d0]`}>
                      Stage {num(i)} of {String(DELIVERY_STAGES.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display text-3xl font-bold text-[#0f2b57]">{s.title}</h3>
                    <p className="mt-3 max-w-[60ch] text-body-l text-[#0f2b57]/80">{s.lead}</p>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-5">
                      <ul className="space-y-2.5 md:col-span-3">
                        {s.actions.map((a) => (
                          <li key={a} className="flex gap-3 text-body text-[#0f2b57]">
                            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0048b0] text-white">
                              <Check size={12} strokeWidth={3} />
                            </span>
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="rounded-2xl border border-[#dbe9fa] bg-white p-4 md:col-span-2">
                        <p className={`${eyebrow} text-[#5a6b84]`}>What you receive</p>
                        <ul className="mt-3 space-y-2">
                          {s.records.map((r) => (
                            <li key={r} className="flex items-center gap-2 text-caption font-medium text-[#0f2b57]">
                              <FileCheck2 size={16} className="shrink-0 text-[#3e86d0]" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Closing commitment */}
      <section className="bg-[#071a3a] py-12 text-white">
        <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#7fb6e8]`}>Our commitment</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {CONTROLS_COMMITMENT.map((c) => (
              <li
                key={c}
                className="rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 font-display text-body-l font-semibold"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
