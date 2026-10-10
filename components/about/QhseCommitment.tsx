import { BadgeCheck, Handshake, HardHat, Leaf, Scale, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import { QHSE_COMMITMENT } from "@/data/content/about";

// Same order as QHSE_COMMITMENT.
const ICONS: LucideIcon[] = [HardHat, BadgeCheck, Leaf, Scale, Handshake];

export default function QhseCommitment() {
  return (
    <section className="bg-[#f4f8fd] py-8 text-[#0f2b57] md:py-8">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body font-bold uppercase tracking-[0.14em] text-[#3e86d0]">QHSE Commitment</p>
          <h2 className="mt-4 font-display text-display-m">Quality, Health, Safety &amp; Environment.</h2>
          <p className="mt-5 text-body-l text-[#5a6b84]">
            Five commitments that govern every site we run and every structure we hand over.
          </p>
        </div>

        <div className="m-scroll mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {QHSE_COMMITMENT.map((q, i) => {
            const Icon = ICONS[i];
            return (
              <article
                key={q.title}
                className="group relative flex flex-col items-center rounded-3xl border border-[#0f2b57]/10 bg-white px-6 pb-8 pt-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-[#0f2b57] hover:text-white hover:shadow-[0_30px_60px_-28px_rgba(15,43,87,0.7)]"
              >
                <span className="tabular absolute right-5 top-4 text-label text-[#0f2b57]/30 transition-colors duration-300 group-hover:text-white/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf2fc] text-[#0b4fc2] ring-8 ring-[#f4f8fd] transition-colors duration-300 group-hover:bg-[#0b4fc2] group-hover:text-white group-hover:ring-white/10">
                  <Icon size={28} />
                </span>
                <h3 className="mt-6 font-display text-body-l font-bold leading-snug">{q.title}</h3>
                <p className="mt-3 text-caption text-[#5a6b84] transition-colors duration-300 group-hover:text-white/75">
                  {q.body}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
