import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import JellyFrame from "@/components/ui/JellyFrame";
import { DirectorProfiles, TeamStrip, type Leader } from "@/components/leadership/LeaderCards";
import { IMAGES } from "@/data/images";
import { MANPOWER_STATS, roleRank } from "@/data/content/leadership";
import { loadHome } from "@/lib/homeContent";

export const metadata: Metadata = {
  title: "Leadership — Vinara Infra LLP",
  description: "The directors, management team and project organisation behind Vinara's delivery.",
};

const eyebrow = "text-label uppercase tracking-[0.14em]";

// Everyone on this page is edited in Admin → Leadership.
async function loadLeaders() {
  const rows = await loadHome("leader");
  const people = rows
    .map((d) => ({
      leader: {
        name: d.name ?? "",
        role: d.role ?? "",
        bio: d.bio ?? "",
        image: d.image ?? "",
        experience: d.experience ?? "",
        vinaraYears: d.vinaraYears ?? "",
        qualification: d.qualification ?? "",
        projects: (d.projects ?? "").split(/\r?\n/).map((x) => x.trim()).filter(Boolean),
      } satisfies Leader,
      director: (d.group ?? (/director/i.test(d.role ?? "") ? "Directors" : "")) === "Directors",
    }))
    .sort((a, b) => roleRank(a.leader.role) - roleRank(b.leader.role));
  return {
    directors: people.filter((p) => p.director).map((p) => p.leader),
    team: people.filter((p) => !p.director).map((p) => p.leader),
  };
}

const fmt = (v: number | string) => (typeof v === "number" ? v.toLocaleString("en-IN") : v);

export default async function LeadershipPage() {
  const { directors, team } = await loadLeaders();
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
      {directors.length ? (
        <section id="directors" className="bg-white py-6">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <p className={`${eyebrow} text-[#3e86d0]`}>Directors</p>
            <div className="mt-8">
              <DirectorProfiles people={directors} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Leadership team: a slow strip of black-and-white portraits that colour on hover */}
      {team.length ? (
        <section className="overflow-hidden bg-white py-12 md:py-16">
          <div className="px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-5xl font-bold text-[#0f2b57] md:text-6xl">
              Meet the <span className="join-shine">team.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-body-l text-[#5a6b84]">
              The people behind every plan, pour and handover at Vinara.
            </p>
          </div>
          <div className="mt-10">
            <TeamStrip people={team} />
          </div>
        </section>
      ) : null}
    </>
  );
}
