import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CurvedPeopleGallery from "@/components/home/CurvedPeopleGallery";
import { loadHome } from "@/lib/homeContent";

export default async function LeadershipReel() {
  const team = (await loadHome("leader")) as { name: string; role: string; bio: string; image: string }[];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-white py-20">
      <Container full className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
          <span className="h-px w-6 bg-blue-500" />
          Leadership
        </div>

        <h2 className="mt-4 max-w-2xl text-display-l font-display leading-[1.05]">
          <span className="text-ink">The people </span>
          <span className="text-blue-600">behind the build.</span>
        </h2>

        <p className="mt-4 max-w-[52ch] text-body-l text-grey-500">
          Directors, project leads and site engineers driving delivery across every Vinara programme.
        </p>

        <Link
          href="/leadership"
          className="mt-7 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-caption font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          Meet the full team
          <ArrowRight size={14} />
        </Link>
      </Container>

      <div className="mt-16">
        <CurvedPeopleGallery
          images={team.map((p) => ({ src: p.image, alt: `${p.name} — ${p.role}`, name: p.name, role: p.role }))}
        />
      </div>
    </section>
  );
}
