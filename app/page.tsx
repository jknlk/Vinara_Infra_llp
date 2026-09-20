import { loadHome } from "@/lib/homeContent";
import HomeHeroLight from "@/components/hero/HomeHeroLight";
import AboutHighlight from "@/components/home/AboutHighlight";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import LeadershipReel from "@/components/home/LeadershipReel";
import TrustedByMarquee from "@/components/home/TrustedByMarquee";
import GalleryPreview from "@/components/home/GalleryPreview";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stats = await loadHome("hero_stat");
  return (
    <>
      <HomeHeroLight stats={stats as { value: string; label: string }[]} />

      {/* S3 · About highlight */}
      <AboutHighlight />

      {/* S4 · Services */}
      <ServicesShowcase />

      {/* S5 · Projects */}
      <ProjectsShowcase />


      {/* S7b · Leadership */}
      <LeadershipReel />

      {/* S8 · Trusted by */}
      <TrustedByMarquee />

      {/* S8b · Gallery preview */}
      <GalleryPreview />
    </>
  );
}
