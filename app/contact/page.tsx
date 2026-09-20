import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
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

const CONTACT_POINTS = [
  { icon: MapPin, label: "Head office", value: CONTACT.addressLines.join(", ") },
  { icon: Phone, label: "Managing Director", value: CONTACT.departments[0].contact },
  { icon: Mail, label: "General enquiries", value: CONTACT.departments[1].contact },
  { icon: Clock, label: "Office hours", value: "Mon – Sat · 9:00 AM – 6:00 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's build together."
        standfirst="Have a warehousing brief, an infrastructure programme or a design-build enquiry? Our senior team responds within 24 hours."
      />

      {/* S2 · Split panel — enquiry form + company details */}
      <section className="bg-surface py-14 md:py-20">
        <Container full className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <SectionHead title="Send an enquiry" standfirst="Tell us about scope, location and timelines — a senior team member will follow up personally." />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-5">
            <SectionHead title="Get in touch" />
            <div className="mt-8 space-y-3">
              {CONTACT_POINTS.map((p) => (
                <div
                  key={p.label}
                  className="group flex items-start gap-4 rounded-2xl border border-navy-500 bg-navy-900 p-5 transition-colors hover:border-sky-400/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-sky-700 transition-colors group-hover:bg-sky-400 group-hover:text-white">
                    <p.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-label uppercase tracking-[0.08em] text-grey-500">{p.label}</p>
                    <p className="mt-1 text-body font-medium text-ink">{p.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <LocationMap />
            </div>
          </div>
        </Container>
      </section>

      {/* S3 · What happens next */}
      <section className="border-t border-navy-500 bg-navy-900 py-14 md:py-16">
        <Container full>
          <SectionHead title="What happens next" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {NEXT_STEPS.map((s, i) => (
              <DataPanel key={s.title} accent="var(--color-sky-400)">
                <span className="tabular text-caption text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-body-l font-display font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-caption text-grey-300">{s.body}</p>
              </DataPanel>
            ))}
          </div>
        </Container>
      </section>

      {/* S4 · Departments & sites */}
      <section className="bg-surface py-14 md:py-16">
        <Container full className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="Departments" />
            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-500">
              <table className="w-full min-w-[360px] border-collapse text-body">
                <thead>
                  <tr className="border-b border-navy-500 bg-navy-900 text-left text-label uppercase tracking-[0.08em] text-grey-300">
                    <th className="py-3 pl-5 pr-4 font-semibold">Department</th>
                    <th className="py-3 pr-5 font-semibold">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {CONTACT.departments.map((d, i) => (
                    <tr key={d.department} className={i % 2 === 1 ? "bg-navy-900/40" : ""}>
                      <td className="py-3 pl-5 pr-4 text-ink">{d.department}</td>
                      <td className="py-3 pr-5 text-grey-300">{d.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionHead title="Sites & plant" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SITES.map((s) => (
                <div key={s.name} className="group rounded-2xl border border-navy-500 bg-navy-900 p-6 transition-colors hover:border-sky-400/60">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-400/10 text-sky-700 transition-colors group-hover:bg-sky-400 group-hover:text-white">
                    <CheckCircle2 size={16} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-body-l font-display font-bold text-ink">{s.name}</h3>
                  <p className="mt-1 text-caption text-grey-300">{s.detail}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-[62ch] text-caption text-grey-300">
              Project office for AGP, Turner &amp; Townsend and Vinara is located at Gate 3, NELA 1.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
