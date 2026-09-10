import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import SiteImage from "@/components/ui/SiteImage";
import DataPanel from "@/components/ui/DataPanel";
import { IMAGES } from "@/data/images";
import {
  SERVICE_SECTIONS,
  RMC_PLANT_FACILITY,
  RMC_PRODUCT_RANGE,
  RMC_QUALITY_ASSURANCE,
  RMC_FACILITIES,
  RMC_ORG,
  RMC_MACHINERY,
  RMC_FLEET,
  RMC_STRENGTHS,
  RMC_SAFETY,
  WORKFLOW,
} from "@/data/content/services";

export const metadata: Metadata = {
  title: "Services — Vinara Infra LLP",
  description: "Warehousing, industrial, precast and infrastructure construction, plus our in-house RMC plant.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero title="One partner. Every discipline." image={IMAGES.serviceWarehouse} imageSlot="service-warehouse" />

      {SERVICE_SECTIONS.map((s, i) => (
        <section key={s.slug} id={s.slug} className={i % 2 === 0 ? "bg-ink py-24" : "bg-paper py-24"}>
          <Container className={`grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center ${i % 2 === 1 ? "" : ""}`}>
            <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <SiteImage slot={s.slug} image={IMAGES[s.imageKey as keyof typeof IMAGES]} ratio="4/3" />
            </div>
            <div className="lg:col-span-6">
              <SectionHead tone={i % 2 === 1 ? "light" : "dark"} title={s.title} standfirst={s.body} />
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-lg border px-4 py-3 text-caption font-medium ${
                      i % 2 === 1
                        ? "border-[#E3EAF4] bg-white text-ink"
                        : "border-navy-500 bg-navy-900 text-grey-300"
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className={`mt-6 text-caption ${i % 2 === 1 ? "text-grey-500" : "text-grey-300"}`}>{s.reference}</p>
            </div>
          </Container>
        </section>
      ))}

      {/* S6 · RMC Plant & Concrete Supply — the standout section */}
      <section id="rmc" className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead
            title="RMC Plant & Concrete Supply"
            standfirst="Our RMC plant is designed for efficiency, consistency and large-scale production. Equipped with advanced technology and strong infrastructure, we ensure reliable supply and superior quality for every project."
          />

          <div className="mt-12">
            <SiteImage slot="service-rmc" image={IMAGES.serviceRmc} ratio="21/9" />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {RMC_PLANT_FACILITY.map((f) => (
              <DataPanel key={f.title}>
                <h3 className="text-body-l font-display font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{f.body}</p>
              </DataPanel>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Product range</p>
              <ul className="mt-4 space-y-3">
                {RMC_PRODUCT_RANGE.map((p) => (
                  <li key={p} className="text-body text-grey-300">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Quality assurance</p>
              <ul className="mt-4 space-y-3">
                {RMC_QUALITY_ASSURANCE.map((p) => (
                  <li key={p} className="text-body text-grey-300">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Facilities</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {RMC_FACILITIES.map((p) => (
                  <li key={p} className="rounded-full border border-navy-500 px-3 py-1 text-caption text-grey-300">
                    {p}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-label uppercase tracking-[0.08em] text-grey-300">Safety & compliance</p>
              <ul className="mt-4 space-y-3">
                {RMC_SAFETY.map((p) => (
                  <li key={p} className="text-caption text-grey-300">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Organisation and machinery table */}
          <div className="mt-16 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-body">
              <thead>
                <tr className="border-b border-navy-500 text-left text-label uppercase tracking-[0.08em] text-grey-300">
                  <th className="py-3 pr-4 font-semibold">Role</th>
                  <th className="py-3 pr-8 text-right font-semibold">Nos</th>
                  <th className="py-3 pr-4 font-semibold">Asset</th>
                  <th className="py-3 text-right font-semibold">Nos</th>
                </tr>
              </thead>
              <tbody>
                {RMC_ORG.map((row, i) => (
                  <tr key={row.role} className="border-b border-navy-500/60">
                    <td className="py-3 pr-4 text-white">{row.role}</td>
                    <td className="tabular py-3 pr-8 text-right text-grey-300">{row.nos}</td>
                    <td className="py-3 pr-4 text-white">{RMC_MACHINERY[i]?.asset ?? ""}</td>
                    <td className="tabular py-3 text-right text-grey-300">{RMC_MACHINERY[i]?.nos ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Fleet & logistics</p>
              <ul className="mt-4 space-y-3">
                {RMC_FLEET.map((p) => (
                  <li key={p} className="text-body text-grey-300">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-label uppercase tracking-[0.08em] text-grey-300">Key strengths</p>
              <ul className="mt-4 space-y-3">
                {RMC_STRENGTHS.map((p) => (
                  <li key={p} className="text-body text-grey-300">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-16 text-display-m font-display text-white">Built for reliability. Designed for performance.</p>
        </Container>
      </section>

      {/* S7 · Workflow */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Workflow" />
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {WORKFLOW.map((w, i) => (
              <div key={w} className="border-t border-sky-400 pt-4">
                <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-caption font-medium text-white">{w}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
