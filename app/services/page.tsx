import type { Metadata } from "next";
import {
  ArrowUpRight,
  Check,
  Factory,
  Layers,
  Warehouse,
  Cog,
  PackageSearch,
  FlaskConical,
  Truck,
  Award,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SiteImage from "@/components/ui/SiteImage";
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

const eyebrow = "text-label uppercase tracking-[0.14em]";

function Bullets({ items, dark }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((p) => (
        <li key={p} className={`flex items-start gap-3 text-body ${dark ? "text-white/80" : "text-[#5a6b84]"}`}>
          <Check size={16} className="mt-1 shrink-0 text-[#3e86d0]" />
          {p}
        </li>
      ))}
    </ul>
  );
}

const FACILITY_ICONS = [Factory, Layers, Warehouse, Cog];

function FacilityCard({
  icon: Icon,
  index,
  title,
  body,
}: {
  icon: typeof Factory;
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3e86d0]/60 hover:bg-white/[0.06] hover:shadow-[0_20px_40px_-16px_rgba(62,134,208,0.35)]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#3e86d0]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#3e86d0]/15 text-[#7fb6e8] ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-[#3e86d0]/25">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <span className="tabular text-caption font-semibold text-white/30">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="relative mt-5 font-display text-body-l font-bold leading-snug text-white">{title}</h3>
      <p className="relative mt-2 text-caption leading-relaxed text-white/60">{body}</p>
    </div>
  );
}

const COLUMN_ICONS = { product: PackageSearch, quality: FlaskConical, fleet: Truck, strengths: Award };

function BulletColumn({
  icon: Icon,
  label,
  items,
}: {
  icon: typeof PackageSearch;
  label: string;
  items: string[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:bg-white/[0.05]">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#3e86d0]/15 text-[#7fb6e8] ring-1 ring-inset ring-white/10">
          <Icon size={16} strokeWidth={1.75} />
        </span>
        <p className={`${eyebrow} text-[#7fb6e8]`}>{label}</p>
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((p) => (
          <li key={p} className="flex items-start gap-3 text-body text-white/75">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#3e86d0]/15 text-[#7fb6e8]">
              <Check size={11} strokeWidth={2.5} />
            </span>
            <span className="leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90svh] flex-col overflow-hidden bg-[#0b2247] text-white">
        <div className="absolute inset-0">
          <SiteImage
            slot="services-hero"
            image={IMAGES.serviceWarehouse}
            ratio="auto"
            className="h-full w-full rounded-none border-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b2247] via-[#0b2247]/85 to-[#0b2247]/25" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0b2247] to-transparent" />
        </div>
        <Container className="relative flex flex-1 flex-col justify-center pb-16 pt-36">
          <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
            <span className="h-px w-10 bg-[#7fb6e8]" />
            Our services
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] md:text-7xl">
            One partner.
            <span className="block text-[#7fb6e8]">Every discipline.</span>
          </h1>
          <p className="mt-6 max-w-[50ch] text-body-l text-white/85">
            Four integrated disciplines, one accountable team, backed by an in-house RMC plant.
          </p>
        </Container>
        <Container className="relative">
          <nav className="grid grid-cols-2 border-t border-white/20 md:grid-cols-5">
            {[...SERVICE_SECTIONS.map((s) => ({ id: s.slug, label: s.title })), { id: "rmc", label: "RMC Plant" }].map(
              (l, i) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  className="group flex items-center justify-between gap-2 border-white/20 py-5 pr-4 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0"
                >
                  <span>
                    <span className="tabular block text-caption text-[#7fb6e8]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-body font-bold">{l.label}</span>
                  </span>
                  <ArrowUpRight size={18} className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              )
            )}
          </nav>
        </Container>
      </section>

      {/* Service rows */}
      {SERVICE_SECTIONS.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`py-24 ${flip ? "bg-[#f2f7fc]" : "bg-white"}`}>
            <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                <div className="relative overflow-hidden rounded-2xl">
                  <SiteImage
                    slot={s.slug}
                    image={IMAGES[s.imageKey as keyof typeof IMAGES]}
                    ratio="4/3"
                    className="rounded-2xl border-0"
                  />
                  <span className="absolute left-5 top-4 font-display text-6xl font-bold text-white drop-shadow-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
                <p className={`${eyebrow} text-[#3e86d0]`}>Capability {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">{s.title}</h2>
                <p className="mt-5 text-body-l text-[#5a6b84]">{s.body}</p>
                <ul className="mt-8 grid grid-cols-1 border-t border-[#0f2b57]/15 sm:grid-cols-2 sm:gap-x-8">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 border-b border-[#0f2b57]/15 py-3 text-body font-medium text-[#0f2b57]"
                    >
                      <Check size={16} className="shrink-0 text-[#3e86d0]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-caption text-[#5a6b84]">Reference: {s.reference}</p>
              </div>
            </Container>
          </section>
        );
      })}

      {/* RMC */}
      <section id="rmc" className="relative overflow-hidden bg-[#0f2b57] py-24 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[#3e86d0]/15 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#7fb6e8]/10 blur-[120px]" />
        </div>
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className={`${eyebrow} flex items-center gap-3 text-[#7fb6e8]`}>
                <span className="h-px w-10 bg-[#7fb6e8]" />
                In-house
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">RMC Plant &amp; Concrete Supply</h2>
              <p className="mt-6 max-w-[58ch] text-body-l text-white/80">
                Efficient, consistent, large-scale production with reliable supply and superior quality for every
                project.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] lg:col-span-5">
              <SiteImage slot="service-rmc" image={IMAGES.serviceRmc} ratio="16/10" className="rounded-2xl border-0" />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {RMC_PLANT_FACILITY.map((f, i) => (
              <FacilityCard key={f.title} icon={FACILITY_ICONS[i]} index={i} title={f.title} body={f.body} />
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <BulletColumn icon={COLUMN_ICONS.product} label="Product range" items={RMC_PRODUCT_RANGE} />
            <BulletColumn icon={COLUMN_ICONS.quality} label="Quality assurance" items={RMC_QUALITY_ASSURANCE} />
            <BulletColumn icon={COLUMN_ICONS.fleet} label="Fleet & logistics" items={RMC_FLEET} />
            <BulletColumn icon={COLUMN_ICONS.strengths} label="Key strengths" items={RMC_STRENGTHS} />
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className={`${eyebrow} text-[#7fb6e8]`}>Team &amp; machinery</p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-white/15">
                <table className="w-full min-w-[520px] border-collapse text-body">
                  <thead>
                    <tr className="border-b border-white/15 text-left text-label uppercase tracking-[0.08em] text-white/60">
                      <th className="py-4 pl-6 pr-4 font-semibold">Role</th>
                      <th className="py-4 pr-8 text-right font-semibold">Nos</th>
                      <th className="py-4 pr-4 font-semibold">Asset</th>
                      <th className="py-4 pr-6 text-right font-semibold">Nos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RMC_ORG.map((row, i) => (
                      <tr key={row.role} className="border-b border-white/10 last:border-0">
                        <td className="py-3 pl-6 pr-4">{row.role}</td>
                        <td className="tabular py-3 pr-8 text-right text-white/70">{row.nos}</td>
                        <td className="py-3 pr-4">{RMC_MACHINERY[i]?.asset ?? ""}</td>
                        <td className="tabular py-3 pr-6 text-right text-white/70">{RMC_MACHINERY[i]?.nos ?? ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:col-span-5">
              <p className={`${eyebrow} text-[#7fb6e8]`}>Facilities</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {RMC_FACILITIES.map((p) => (
                  <li key={p} className="rounded-full border border-white/25 px-4 py-1.5 text-caption text-white/85">
                    {p}
                  </li>
                ))}
              </ul>
              <p className={`${eyebrow} mt-10 text-[#7fb6e8]`}>Safety &amp; compliance</p>
              <Bullets items={RMC_SAFETY} dark />
            </div>
          </div>

          <p className="mt-20 font-display text-2xl font-bold text-[#7fb6e8] md:text-4xl">
            Built for reliability. Designed for performance.
          </p>
        </Container>
      </section>

      {/* Workflow */}
      <section className="bg-white py-24">
        <Container>
          <p className={`${eyebrow} text-[#3e86d0]`}>Workflow</p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold text-[#0f2b57] md:text-5xl">
            Six stages. One accountable team.
          </h2>
          <ol className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
            {WORKFLOW.map((w, i) => (
              <li key={w} className="border-t-2 border-[#3e86d0] pt-5">
                <span className="tabular font-display text-3xl font-bold text-[#3e86d0]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-body font-medium text-[#0f2b57]">{w}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
