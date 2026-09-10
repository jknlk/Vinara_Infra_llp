import { MapPin, ShieldCheck, Mail } from "lucide-react";
import LocationMap from "@/components/contact/LocationMap";
import ContactFormLight from "@/components/contact/ContactFormLight";
import { CONTACT } from "@/data/content/site";

const INFO = [
  {
    icon: MapPin,
    label: "Head Office",
    value: "Vinara Infra LLP, Bengaluru, Karnataka",
  },
  {
    icon: ShieldCheck,
    label: "QHSE Culture",
    value: "Zero Harm · Teamwork · Care for Life · Safety First",
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT.departments[1].contact,
  },
];

export default function ContactPreview() {
  return (
    <section className="bg-gradient-to-b from-paper to-white py-24">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
              <span className="h-px w-6 bg-blue-500" />
              Contact
            </div>
            <h2 className="mt-4 text-display-l font-display leading-[1.05]">
              <span className="text-ink">Let&rsquo;s build </span>
              <span className="text-blue-600">together.</span>
            </h2>
            <p className="mt-6 max-w-[52ch] text-body-l text-grey-500">
              Have a warehousing brief, an infrastructure programme or a design-build enquiry? Our
              senior team responds within 24 hours.
            </p>

            <div className="mt-8 flex flex-col gap-5">
              {INFO.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#E3EAF4] bg-white text-blue-600">
                    <item.icon size={18} />
                  </span>
                  <div>
                    <p className="text-label uppercase tracking-[0.08em] text-grey-500">{item.label}</p>
                    <p className="mt-0.5 text-body font-medium text-ink">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <LocationMap light heightClassName="h-[280px] w-full" />
            </div>
          </div>

          <div className="rounded-3xl border border-[#E3EAF4] bg-white p-8 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h3 className="text-display-m font-display font-bold text-ink">Get a Quote</h3>
              <span className="rounded-full border border-sky-400/40 bg-sky-50 px-3 py-1 text-label font-semibold uppercase tracking-[0.06em] text-blue-700">
                Reply in 24h
              </span>
            </div>
            <div className="mt-8">
              <ContactFormLight />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
