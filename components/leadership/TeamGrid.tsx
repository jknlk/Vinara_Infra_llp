import { ArrowUpRight } from "lucide-react";
import { TEAM } from "@/data/content/leadership";

export default function TeamGrid({ asPageTitle = true }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  return (
    <section className="bg-white pb-24 pt-12">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Leadership
        </div>

        <Heading className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">The people </span>
          <span className="text-blue-600">behind the build.</span>
        </Heading>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((p) => (
            <div
              key={p.name}
              className="relative rounded-2xl border border-[#E3EAF4] bg-white p-6 transition-colors hover:border-blue-400"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-xl border border-[#E3EAF4] text-body-l font-display font-bold text-navy-700">
                  {p.initials}
                </span>
                <ArrowUpRight size={16} className="text-grey-500" />
              </div>
              <h3 className="mt-5 text-body-l font-display font-bold text-ink">{p.name}</h3>
              <p className="mt-0.5 text-caption font-medium text-blue-600">{p.role}</p>
              <p className="mt-3 text-caption text-grey-500">{p.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
