import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import SiteImage from "@/components/ui/SiteImage";
import StatBlock from "@/components/ui/StatBlock";
import { IMAGES } from "@/data/images";
import {
  DIRECTORS,
  MANAGEMENT_TEAM,
  PENDING_TEAM_MEMBER,
  PROJECT_ORG_CHART,
  MANPOWER_STATS,
  CULTURE_PILLARS,
} from "@/data/content/leadership";

export const metadata: Metadata = {
  title: "Leadership — Vinara Infra LLP",
  description: "The directors, management team and project organisation behind Vinara's delivery.",
};

export default function LeadershipPage() {
  return (
    <>
      <PageHero title="The people behind the build." />

      {/* S2 · Directors */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Directors" />
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
            {DIRECTORS.map((d) => (
              <div key={d.name}>
                <SiteImage slot={d.imageKey} image={IMAGES[d.imageKey as keyof typeof IMAGES]} ratio="4/3" />
                <h3 className="mt-6 text-display-m font-display text-white">{d.name}</h3>
                <p className="mt-1 text-caption uppercase tracking-[0.08em] text-sky-200">{d.role}</p>
                <p className="mt-3 max-w-[48ch] text-body text-grey-300">{d.bio}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* S3 · Management team */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="Management team" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MANAGEMENT_TEAM.map((m) => (
              <div key={m.name} className="rounded-[4px] border border-navy-500 bg-ink p-6">
                <h3 className="text-body-l font-display font-bold text-white">{m.name}</h3>
                <p className="mt-1 text-caption uppercase tracking-[0.08em] text-sky-200">{m.role}</p>
                <p className="mt-3 text-caption text-grey-300">{m.bio}</p>
              </div>
            ))}
            <div className="rounded-[4px] border border-dashed border-navy-500 bg-ink p-6">
              <h3 className="text-body-l font-display font-bold text-grey-300">{PENDING_TEAM_MEMBER.initials}</h3>
              <p className="mt-1 text-caption uppercase tracking-[0.08em] text-grey-300">Pending confirmation</p>
              <p className="mt-3 text-caption text-grey-500">Full name and role to be supplied by the client.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* S4 · Project organisation */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Project organisation" />
          <div className="mt-10 flex flex-col gap-3">
            {PROJECT_ORG_CHART.map((role, i) => (
              <div
                key={role}
                className="rounded-lg border border-navy-500 bg-navy-900 px-5 py-3 text-body text-white"
                style={{ marginLeft: `${i * 16}px` }}
              >
                {role}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* S5 · Manpower */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="Manpower" />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {MANPOWER_STATS.map((s) => (
              <StatBlock key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* S6 · Culture & careers */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Culture & careers" />
          <div className="mt-10 flex flex-wrap gap-3">
            {CULTURE_PILLARS.map((c) => (
              <span key={c} className="rounded-full border border-navy-500 px-4 py-2 text-caption text-grey-300">{c}</span>
            ))}
          </div>
          <Link
            href="/contact"
            className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-body font-semibold text-ink hover:bg-sky-200"
          >
            Explore careers
          </Link>
        </Container>
      </section>
    </>
  );
}
