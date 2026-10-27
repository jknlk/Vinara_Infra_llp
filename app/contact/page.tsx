import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHead from "@/components/ui/SectionHead";
import QuoteStudio from "@/components/contact/QuoteStudio";
import LocationMap from "@/components/contact/LocationMap";
import { CONTACT } from "@/data/content/site";

export const metadata: Metadata = {
  title: "Get a Quote — Vinara Infra LLP",
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
  { icon: Mail, label: "General enquiries", value: CONTACT.email },
  { icon: Clock, label: "Office hours", value: "Mon – Sat · 9:00 AM – 6:00 PM IST" },
];

export default function ContactPage() {
  return (
    <>
      {/* S1 · Quote builder */}
      <QuoteStudio />

      {/* S2 · What happens next */}
      <section className="border-b border-navy-500 bg-white py-14 md:py-20">
        <Container>
          <SectionHead title="What happens next" standfirst="No call-centre queue — your brief goes straight to the people who will build it." tone="light" />
          <ol className="relative mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
            <span aria-hidden className="absolute left-6 right-6 top-6 hidden h-px bg-gradient-to-r from-blue-600 via-blue-300 to-blue-100 sm:block" />
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="tabular relative grid h-12 w-12 place-items-center rounded-full bg-blue-600 text-body font-bold text-white shadow-lg shadow-blue-600/25 ring-8 ring-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-body-l font-display font-bold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-[34ch] text-body text-grey-500">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* S3 · Company details + map */}
      <section className="bg-white py-14 md:py-20">
        <Container full className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-5">
            <SectionHead title="Prefer to talk?" standfirst="Reach the team directly, or visit the head office." tone="light" />
            <div className="mt-8 space-y-3">
              {CONTACT_POINTS.map((p) => (
                <div
                  key={p.label}
                  className="group flex items-start gap-4 rounded-2xl border border-navy-500 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-sky-400/60 hover:shadow-[0_16px_40px_-20px_rgba(0,72,176,0.4)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky-400/10 text-sky-700 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                    <p.icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-label uppercase tracking-[0.08em] text-grey-500">{p.label}</p>
                    <p className="mt-1 text-body font-medium text-ink">{p.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <LocationMap heightClassName="h-[360px] w-full lg:h-[540px]" />
          </div>
        </Container>
      </section>

      {/* S4 · Departments & sites */}
      <section className="border-t border-navy-500 bg-white py-14 md:py-20">
        <Container full className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead title="Departments" />
            <div className="mt-8 overflow-hidden rounded-2xl border border-navy-500">
              <table className="w-full min-w-[360px] border-collapse text-body">
                <thead>
                  <tr className="bg-blue-600 text-left text-label uppercase tracking-[0.08em] text-white">
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
                <div key={s.name} className="group rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 shadow-[0_18px_40px_-22px_rgba(0,72,176,0.7)] transition-transform hover:-translate-y-1">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white transition-colors group-hover:bg-white group-hover:text-blue-600">
                    <CheckCircle2 size={16} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-body-l font-display font-bold text-white">{s.name}</h3>
                  <p className="mt-1 text-caption text-blue-100">{s.detail}</p>
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
