import HomeHeroLight from "@/components/hero/HomeHeroLight";
import AboutHighlight from "@/components/home/AboutHighlight";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import ProjectsShowcase from "@/components/home/ProjectsShowcase";
import StatsShowcase from "@/components/home/StatsShowcase";
import ConstructionTimeline from "@/components/home/ConstructionTimeline";
import TeamGrid from "@/components/leadership/TeamGrid";
import TrustedByMarquee from "@/components/home/TrustedByMarquee";
import GalleryPreview from "@/components/home/GalleryPreview";

export default function HomePage() {
  return (
    <>
      <HomeHeroLight />

      {/* S3 · About highlight */}
      <AboutHighlight />

      {/* S4 · Services */}
      <ServicesShowcase />

      {/* S5 · Projects */}
      <ProjectsShowcase />

      {/* S6 · By the numbers */}
      <StatsShowcase />

      {/* S7 · Construction timeline */}
      <ConstructionTimeline />

      {/* S7b · Leadership */}
      <TeamGrid asPageTitle={false} />

      {/* S8 · Trusted by */}
      <TrustedByMarquee />

      {/* S8b · Gallery preview */}
      <GalleryPreview />
    </>
  );
}
