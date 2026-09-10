import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import DataPanel from "@/components/ui/DataPanel";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { CONTACT } from "@/data/content/site";

export const metadata: Metadata = {
  title: "Contact — Vinara Infra LLP",
  description: "Have a warehousing brief, an infrastructure programme or a design-build enquiry? Get in touch.",
};

const NEXT_STEPS = [
  { title: "Acknowledge", body: "We acknowledge within 24 hours" },
  { title: "Review", body: "A senior team member reviews scope and feasibility" },
  { title: "Respond", body: "We revert with an approach note and indicative programme" },
];

const SITES = [
  { name: "NELA 1", detail: "Nelamangala, Bengaluru" },
  { name: "NELA 2", detail: "Nelamangala, Bengaluru" },
  { name: "Bikaner House", detail: "Industrial & Logistics Park" },
  { name: "RMC Plant", detail: "In-house batching plant" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's build together."
        standfirst="Have a warehousing brief, an infrastructure programme or a design-build enquiry? Our senior team responds within 24 hours."
      />

      {/* S2 · Enquiry form */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Send an enquiry" />
          <div className="mt-10 max-w-3xl">
            <ContactForm />
          </div>
        </Container>
      </section>

      {/* S3 · Head office */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="Head office" />
            <address className="mt-6 not-italic text-body-l leading-relaxed text-grey-300">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </address>
          </div>
          <div className="lg:col-span-7">
            <LocationMap />
          </div>
        </Container>
      </section>

      {/* S4 · Departments */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Departments" />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-body">
              <thead>
                <tr className="border-b border-navy-500 text-left text-label uppercase tracking-[0.08em] text-grey-300">
                  <th className="py-3 pr-4 font-semibold">Department</th>
                  <th className="py-3 font-semibold">Contact</th>
                </tr>
              </thead>
              <tbody>
                {CONTACT.departments.map((d) => (
                  <tr key={d.department} className="border-b border-navy-500/60">
                    <td className="py-3 pr-4 text-white">{d.department}</td>
                    <td className="py-3 text-grey-300">{d.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* S5 · What happens next */}
      <section className="border-t border-navy-500 bg-navy-900 py-24">
        <Container>
          <SectionHead title="What happens next" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {NEXT_STEPS.map((s, i) => (
              <DataPanel key={s.title} accent="var(--color-sky-400)">
                <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-body-l font-display font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{s.body}</p>
              </DataPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* S6 · Sites & plant */}
      <section className="bg-ink py-24">
        <Container>
          <SectionHead title="Sites & plant" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SITES.map((s) => (
              <div key={s.name} className="rounded-[4px] border border-navy-500 bg-navy-900 p-6">
                <h3 className="text-body-l font-display font-bold text-white">{s.name}</h3>
                <p className="mt-1 text-caption text-grey-300">{s.detail}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[62ch] text-caption text-grey-300">
            Project office for AGP, Turner &amp; Townsend and Vinara is located at Gate 3, NELA 1.
          </p>
        </Container>
      </section>
    </>
  );
}
