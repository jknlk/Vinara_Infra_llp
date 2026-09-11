import Image from "next/image";
import { ArrowUpRight, Quote } from "lucide-react";
import { TEAM, DIRECTORS } from "@/data/content/leadership";

const REST = TEAM.slice(DIRECTORS.length);
const MARQUEE = [...REST, ...REST];

function Avatar({
  photo,
  name,
  size,
  className = "",
}: {
  photo: string;
  name: string;
  size: string;
  className?: string;
}) {
  return (
    <span className={`relative block shrink-0 overflow-hidden ${size} ${className}`}>
      <Image
        src={photo}
        alt={name}
        fill
        sizes="128px"
        className="object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
      />
    </span>
  );
}

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

        {/* Directors — spotlight row */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {DIRECTORS.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-3xl border border-[#E3EAF4] bg-white p-8 transition-colors hover:border-blue-400"
            >
              <Quote
                size={64}
                className="pointer-events-none absolute -right-2 -top-2 text-[#EEF2F8]"
                strokeWidth={1}
              />
              <div className="relative flex items-start justify-between">
                <Avatar photo={p.photo} name={p.name} size="h-20 w-20" className="rounded-2xl" />
                <ArrowUpRight
                  size={18}
                  className="text-grey-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
              <h3 className="relative mt-6 text-display-m font-display font-bold text-ink">
                {p.name}
              </h3>
              <p className="mt-1 text-body-l font-medium text-blue-600">{p.role}</p>
              <p className="mt-4 max-w-lg text-body text-grey-500">{p.bio}</p>
            </div>
          ))}
        </div>

        {/* Management & site team — marquee strip */}
        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-marquee items-stretch gap-5 hover:[animation-play-state:paused]">
            {MARQUEE.map((p, i) => (
              <div
                key={`${p.name}-${i}`}
                className="group flex w-72 shrink-0 flex-col gap-4 rounded-2xl border border-[#E3EAF4] bg-white p-6 transition-colors hover:border-blue-400"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    photo={p.photo}
                    name={p.name}
                    size="h-12 w-12"
                    className="rounded-xl border border-[#E3EAF4]"
                  />
                  <div>
                    <h4 className="text-body font-display font-bold text-ink">{p.name}</h4>
                    <p className="text-caption font-medium text-blue-600">{p.role}</p>
                  </div>
                </div>
                <p className="text-caption text-grey-500">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
