import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import JellyFrame from "@/components/ui/JellyFrame";
import DirectorCards from "@/components/leadership/DirectorCards";
import TeamMarquee from "@/components/leadership/TeamMarquee";
import { IMAGES } from "@/data/images";
import {
  TEAM,
  DIRECTORS,
  PROJECT_ORG_CHART,
  MANPOWER_STATS,
} from "@/data/content/leadership";

export const metadata: Metadata = {
  title: "Leadership — Vinara Infra LLP",
  description: "The directors, management team and project organisation behind Vinara's delivery.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";
const REST = TEAM.slice(DIRECTORS.length);

const fmt = (v: number | string) => (typeof v === "number" ? v.toLocaleString("en-IN") : v);

export default function LeadershipPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-white px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className={`${eyebrow} flex items-center gap-3 text-[#2f7fd0]`}>
              <span className="h-px w-10 bg-[#2f7fd0]" />
              Leadership &amp; team
            </p>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.03] tracking-tight text-[#0b2247] md:text-7xl">
              The people
              <span className="block join-shine pb-[0.08em]">behind the build.</span>
            </h1>
            <p className="mt-6 max-w-[48ch] text-body-l text-[#0b2247]/70">
              Directors, engineers and site crews accountable for every pour, every schedule and every handover.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#directors"
                className="inline-flex items-center gap-2 rounded-full bg-[#0b2247] px-7 py-3 text-body font-semibold text-white transition-colors hover:bg-[#2f7fd0]"
              >
                Meet the directors
                <ArrowDown size={18} />
              </a>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 rounded-full border border-[#0b2247]/20 px-7 py-3 text-body font-semibold text-[#0b2247] transition-colors hover:bg-[#f2f7fc]"
              >
                Join the team
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <JellyFrame className="aspect-[4/3]" echoClassName="stroke-[#2f7fd0]/35">
              <Image
                src={IMAGES.planningSchedule.src ?? ""}
                alt={IMAGES.planningSchedule.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </JellyFrame>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
          {MANPOWER_STATS.map((s) => (
            <div key={s.label} className="rounded-2xl border border-[#0b2247]/10 bg-[#f4f8fd] px-6 py-5">
              <dd className="tabular font-display text-4xl font-bold text-[#0b2247] md:text-5xl">{fmt(s.value)}</dd>
              <dt className="mt-2 flex items-center gap-2 text-caption text-[#0b2247]/70">
                <span className="h-px w-6 bg-[#2f7fd0]" />
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Directors */}
      <section id="directors" className="bg-white py-6">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Directors</p>
          <div className="mt-8">
            <DirectorCards directors={DIRECTORS} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="overflow-hidden bg-[#f2f7fc] py-6">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Management &amp; site team</p>
        </Container>
        <div className="mt-8">
          <TeamMarquee members={REST} />
        </div>
      </section>

      {/* Project organisation */}
      <section className="bg-white py-6">
        <div className="grid w-full grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className={`${eyebrow} text-[#3e86d0]`}>Project organisation</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
              Clear roles.
              <span className="block join-shine pb-[0.08em]">Clear reporting.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-body text-[#5a6b84]">
              Five levels, one chain of accountability from the project head to every execution team on site.
            </p>
            <p className="tabular mt-8 font-display text-6xl font-bold text-[#0f2b57]/10">
              {String(PROJECT_ORG_CHART.length).padStart(2, "0")}
              <span className="ml-2 text-body font-normal text-[#5a6b84]">levels</span>
            </p>
          </div>
          <ol className="relative lg:col-span-7">
            <span className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-[#0f2b57] to-[#3e86d0]/20" />
            {PROJECT_ORG_CHART.map((role, i) => {
              const top = i === 0;
              return (
                <li key={role} className="relative flex gap-6 pb-5 last:pb-0">
                  <span
                    className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-white font-display text-body font-bold ${
                      top ? "bg-[#0f2b57] text-white" : "bg-[#dceaf9] text-[#0f2b57]"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={`flex-1 rounded-2xl px-6 py-4 transition-shadow hover:shadow-lg ${
                      top ? "bg-[#0f2b57] text-white" : "border border-[#0f2b57]/15 bg-[#f2f7fc] text-[#0f2b57]"
                    }`}
                  >
                    <p className={`${eyebrow} ${top ? "text-[#7fb6e8]" : "text-[#3e86d0]"}`}>
                      {top ? "Top of the chain" : `Reports to ${PROJECT_ORG_CHART[i - 1]}`}
                    </p>
                    <p className="mt-1 font-display text-body-l font-bold">{role}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </>
  );
}
