import { Award, GraduationCap } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";

export type Leader = {
  name: string;
  role: string;
  bio: string;
  image: string;
  experience: string;
  vinaraYears: string;
  qualification: string;
  projects: string[];
};

const eyebrow = "text-label uppercase tracking-[0.14em]";

const initials = (name: string) =>
  name
    .replace(/^(mr|mrs|ms|dr)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

function Portrait({ p, className }: { p: Leader; className: string }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-[#dceaf9] to-[#f4f8fd] ${className}`}>
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element -- portraits come from admin uploads of any size
        <img src={p.image} alt={p.name} className="absolute inset-0 h-full w-full object-cover object-top" />
      ) : (
        <span className="absolute inset-0 grid place-items-center font-display text-5xl font-bold text-[#2f7fd0]/40">
          {initials(p.name)}
        </span>
      )}
    </div>
  );
}

// Total years and years with Vinara, side by side.
function Experience({ p }: { p: Leader }) {
  const rows = [
    { l: "Experience", v: p.experience },
    { l: "With Vinara", v: p.vinaraYears },
  ].filter((r) => r.v);
  if (!rows.length) return null;
  return (
    <dl className="mt-4 flex gap-6">
      {rows.map((r) => (
        <div key={r.l}>
          <dd className="tabular font-display text-2xl font-bold leading-none text-[#0b2247]">{r.v}</dd>
          <dt className="mt-1 text-caption text-[#0b2247]/60">{r.l}</dt>
        </div>
      ))}
    </dl>
  );
}

function Projects({ p }: { p: Leader }) {
  if (!p.projects.length) return null;
  return (
    <div className="mt-5">
      <p className={`${eyebrow} flex items-center gap-2 text-[#2f7fd0]`}>
        <Award size={14} /> Notable projects
      </p>
      <ul className="mt-2 space-y-1">
        {p.projects.map((x) => (
          <li key={x} className="flex gap-2 text-caption text-[#0b2247]/80">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[#2f7fd0]" />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DirectorProfiles({ people }: { people: Leader[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {people.map((p) => (
        <article
          key={p.name + p.role}
          className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[#0b2247]/10 bg-[#f4f8fd] sm:grid-cols-5"
        >
          <Portrait p={p} className="aspect-[4/5] sm:col-span-2 sm:aspect-auto sm:min-h-[380px]" />
          <div className="flex flex-col p-7 sm:col-span-3 md:p-9">
            <p className={`${eyebrow} text-[#2f7fd0]`}>{p.role}</p>
            <h3 className="mt-2 font-display text-3xl font-bold text-[#0b2247]">{p.name}</h3>
            {p.qualification ? (
              <p className="mt-2 flex items-center gap-2 text-caption text-[#0b2247]/70">
                <GraduationCap size={16} /> {p.qualification}
              </p>
            ) : null}
            <Experience p={p} />
            {p.bio ? <p className="mt-5 max-w-[52ch] text-body text-[#0b2247]/75">{p.bio}</p> : null}
            <Projects p={p} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function TeamStrip({ people }: { people: Leader[] }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-40" />
      <Marquee className="[--duration:60s] [--gap:2rem]" pauseOnHover repeat={people.length < 5 ? 4 : 2}>
        {people.map((p) => (
          <article key={p.name + p.role} className="group/card w-60 shrink-0 sm:w-72">
            <Portrait
              p={p}
              className="aspect-[4/5] rounded-2xl grayscale transition duration-500 group-hover/card:grayscale-0"
            />
            <h3 className="mt-4 font-display text-xl font-bold text-[#0b2247]">{p.name}</h3>
            <p className="mt-1 text-body font-semibold text-[#c98a2b]">{p.role}</p>
            {p.experience ? <p className="mt-1 text-caption text-[#5a6b84]">{p.experience} experience</p> : null}
          </article>
        ))}
      </Marquee>
    </div>
  );
}
