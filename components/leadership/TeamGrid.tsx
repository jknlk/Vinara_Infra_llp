import Image from "next/image";
import { Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import { TEAM, DIRECTORS } from "@/data/content/leadership";

const REST = TEAM.slice(DIRECTORS.length);

function Portrait({
  photo,
  name,
  className = "",
}: {
  photo: string;
  name: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={photo}
        alt={name}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function TeamGrid({ asPageTitle = true }: { asPageTitle?: boolean }) {
  const Heading = asPageTitle ? "h1" : "h2";
  return (
    <section className="bg-surface pb-16 pt-12">
      <Container>
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Leadership
        </div>

        <Heading className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">The people </span>
          <span className="text-blue-600">behind the build.</span>
        </Heading>

        {/* Directors — spotlight portraits */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIRECTORS.map((p) => (
            <div
              key={p.name}
              className="group relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl"
            >
              <Portrait photo={p.photo} name={p.name} className="aspect-[3/4]" />
              <Quote
                size={72}
                className="pointer-events-none absolute right-5 top-5 text-white/10"
                strokeWidth={1}
              />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <h3 className="text-display-m font-display font-bold text-white">{p.name}</h3>
                <p className="mt-1 text-body-l font-medium text-sky-200">{p.role}</p>
                <p className="mt-3 max-w-lg text-body text-grey-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Management & site team — editorial grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REST.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Portrait photo={p.photo} name={p.name} className="aspect-[3/4]" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h4 className="text-body-l font-display font-bold text-white">{p.name}</h4>
                <p className="mt-1 text-caption font-medium text-sky-200">{p.role}</p>
                <p className="mt-2 max-h-0 overflow-hidden text-caption text-grey-300 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                  {p.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
