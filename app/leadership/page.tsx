import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
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
      <section className="bg-[#f2f7fc] pb-12 pt-28 md:pt-32">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className={`${eyebrow} flex items-center gap-3 text-[#3e86d0]`}>
              <span className="h-px w-10 bg-[#3e86d0]" />
              Leadership
            </p>
            <h1 className="mt-4 font-display text-5xl font-bold leading-[1.05] text-[#0f2b57] md:text-7xl">
              The people
              <span className="block text-[#3e86d0]">behind the build.</span>
            </h1>
          </div>
          <dl className="grid grid-cols-3 gap-6 lg:col-span-5">
            {MANPOWER_STATS.map((s) => (
              <div key={s.label} className="border-t-2 border-[#3e86d0] pt-3">
                <dd className="tabular font-display text-3xl font-bold text-[#0f2b57]">{fmt(s.value)}</dd>
                <dt className="mt-1 text-caption text-[#5a6b84]">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Directors */}
      <section className="bg-white py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Directors</p>
          <div className="mt-8 space-y-8">
            {DIRECTORS.map((p, i) => (
              <article
                key={p.name}
                className="grid grid-cols-1 overflow-hidden rounded-3xl bg-[#0f2b57] text-white md:grid-cols-12"
              >
                <div className={`relative aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[380px] ${i % 2 ? "md:order-2" : ""}`}>
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:col-span-7 md:p-14">
                  <span className="tabular font-display text-5xl font-bold text-[#7fb6e8]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{p.name}</h2>
                  <p className="mt-1 text-body-l font-medium text-[#7fb6e8]">{p.role}</p>
                  <p className="mt-5 max-w-[56ch] text-body text-white/80">{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-[#f2f7fc] py-20">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Management &amp; site team</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REST.map((p) => (
              <article key={p.name} className="overflow-hidden rounded-2xl border border-[#0f2b57]/10 bg-white">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={p.photo}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-body-l font-bold text-[#0f2b57]">{p.name}</h3>
                  <p className="mt-1 text-caption font-medium text-[#3e86d0]">{p.role}</p>
                  <p className="mt-3 text-caption text-[#5a6b84]">{p.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Project organisation */}
      <section className="bg-white py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12">
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
        </Container>
      </section>

      {/* Culture & careers */}
      <section className="bg-[#0f2b57] py-20 text-white">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
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
        </Container>
      </section>
    </>
  );
}
