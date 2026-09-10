import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import StatBlock from "@/components/ui/StatBlock";
import TeamGrid from "@/components/leadership/TeamGrid";
import {
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
      {/* S1–S3 · Leadership + team grid */}
      <div className="pt-28 md:pt-32">
        <TeamGrid />
      </div>

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
