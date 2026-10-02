import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
import DirectorCards from "@/components/leadership/DirectorCards";
import TeamMarquee from "@/components/leadership/TeamMarquee";
import { IMAGES } from "@/data/images";
import {
  TEAM,
  DIRECTORS,
  PROJECT_ORG_CHART,
  MANPOWER_STATS,
  CULTURE_PILLARS,
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
      <section className="flex h-[100dvh] min-h-[640px] w-full items-center justify-center bg-[#f2f7fc] px-2 pb-2 pt-[5.5rem] sm:px-3">
        <div className="flex h-full min-h-[420px] w-full items-center justify-center rounded-[2rem] bg-[#0f2b57] shadow-2xl">
          <div className="relative h-[95%] w-[96%] overflow-hidden rounded-3xl">
            <Image
              src={IMAGES.planningSchedule.src ?? ""}
              alt={IMAGES.planningSchedule.alt}
              fill
              priority
              sizes="90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#0f2b57]/75" />
            <div className="relative flex h-full flex-col p-6 md:p-12">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
                  <span className="h-px w-10 bg-[#7fb6e8]" />
                  Leadership
                  <span className="h-px w-10 bg-[#7fb6e8]" />
                </p>
                <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-white md:text-7xl">
                  The people
                  <span className="block text-[#7fb6e8]">behind the build.</span>
                </h1>
              </div>
              <dl className="grid grid-cols-3 gap-6">
                {MANPOWER_STATS.map((s) => (
                  <div key={s.label} className="border-t-2 border-[#7fb6e8] pt-3">
                    <dd className="tabular font-display text-3xl font-bold text-white">{fmt(s.value)}</dd>
                    <dt className="mt-1 text-caption text-white/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Directors */}
      <section className="bg-white py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <p className={`${eyebrow} text-[#3e86d0]`}>Directors</p>
          <div className="mt-8">
            <DirectorCards directors={DIRECTORS} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="overflow-hidden bg-[#f2f7fc] py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Management &amp; site team</p>
        </Container>
        <div className="mt-8">
          <TeamMarquee members={REST} />
        </div>
      </section>

      {/* Project organisation */}
      <section className="bg-white py-20">
        <div className="grid w-full grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
            <p className={`${eyebrow} text-[#3e86d0]`}>Project organisation</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
              Clear roles.
              <span className="block text-[#3e86d0]">Clear reporting.</span>
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

      {/* Culture & careers */}
      <section className="bg-[#0f2b57] py-20 text-white">
        <div className="grid w-full grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
          <div className="lg:col-span-6">
            <p className={`${eyebrow} text-[#7fb6e8]`}>Culture &amp; careers</p>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">Build your career with us.</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {CULTURE_PILLARS.map((c) => (
                <li key={c} className="rounded-full border border-white/25 px-4 py-1.5 text-caption text-white/85">
                  {c}
                </li>
              ))}
            </ul>
            <Link
              href="/careers"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-body font-semibold text-[#0f2b57] transition-colors hover:bg-[#7fb6e8]"
            >
              Explore careers
              <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl lg:col-span-6">
            <SiteImage
              slot="leadership-culture"
              image={{ ...IMAGES.showcaseSiteTeam, caption: undefined }}
              ratio="4/3"
              className="rounded-2xl border-0"
            />
          </div>
        </div>
      </section>
    </>
  );
}
