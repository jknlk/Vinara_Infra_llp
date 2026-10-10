import { Blocks, Check, Factory, Route, Warehouse, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { CORE_EXPERTISE } from "@/data/content/about";

// Same order as CORE_EXPERTISE.
const ICONS: LucideIcon[] = [Warehouse, Factory, Blocks, Route];

export default function WhoWeAre() {
  return (
    <section className="bg-[#f4f8fd] py-8 md:py-8">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className="flex items-center gap-3 text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">
            <span className="h-px w-12 bg-[#3e86d0]" />
            Who we are
          </p>
          <h2 className="mt-4 font-display text-display-m text-[#0f2b57]">
            Strong partnerships. Timely delivery. <span className="text-[#0b4fc2]">Lasting impact.</span>
          </h2>
          <p className="mt-6 text-body-l text-[#5a6b84]">
            Based in Bengaluru, we deliver high-quality construction with a strong focus on safety, efficiency and
            long-term value.
          </p>
          <p className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-caption font-semibold text-[#0f2b57] shadow-[0_10px_30px_-18px_rgba(15,43,87,0.5)]">
            <span className="font-display text-xl font-bold text-[#0b4fc2]">
              {String(CORE_EXPERTISE.length).padStart(2, "0")}
            </span>
            core areas of expertise
          </p>
        </div>

        <div className="m-scroll grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-8">
          {CORE_EXPERTISE.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={c.title}
                className="group relative overflow-hidden rounded-3xl border border-[#0f2b57]/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0b4fc2]/30 hover:shadow-[0_30px_60px_-30px_rgba(11,79,194,0.45)] md:p-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0b4fc2] to-[#7fb6e8] transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf2fc] text-[#0b4fc2] transition-colors duration-300 group-hover:bg-[#0b4fc2] group-hover:text-white">
                    <Icon size={26} />
                  </span>
                  <span className="tabular font-display text-5xl font-bold leading-none text-[#0f2b57]/[0.08]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-xl font-bold text-[#0f2b57]">{c.title}</h3>
                <ul className="mt-5 space-y-3 border-t border-[#0f2b57]/10 pt-5">
                  {c.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-body text-[#5a6b84]">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#eaf2fc] text-[#0b4fc2]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
