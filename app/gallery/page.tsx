import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Vinara Infra LLP",
  description: "Drone captures, in-progress shots and completed builds from live Vinara sites.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="From the field."
        standfirst="Drone captures, in-progress shots and completed builds from live Vinara sites."
      />
      <section className="bg-ink py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
