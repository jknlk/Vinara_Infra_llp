import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { AnimatedTestimonials } from "@/components/ui/testimonial";
import { loadHome } from "@/lib/homeContent";

export default async function LeadershipReel() {
  const REEL_ITEMS = (await loadHome("leader")).map((p) => ({
    quote: p.bio,
    name: p.name,
    designation: p.role,
    src: p.image,
  }));
  return (
    <section className="bg-surface py-16">
      <Container full>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-label uppercase tracking-[0.08em] text-grey-500">
              <span className="h-px w-6 bg-blue-500" />
              Leadership
            </div>
            <h2 className="mt-4 max-w-xl text-display-m font-display leading-[1.05]">
              <span className="text-ink">The people </span>
              <span className="text-blue-600">behind the build.</span>
            </h2>
          </div>
          <Link
            href="/leadership"
            className="inline-flex items-center gap-1.5 text-caption font-semibold text-navy-700 hover:text-blue-600"
          >
            Meet the full team
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="mt-4">
          <AnimatedTestimonials testimonials={REEL_ITEMS} />
        </div>
      </Container>
    </section>
  );
}
