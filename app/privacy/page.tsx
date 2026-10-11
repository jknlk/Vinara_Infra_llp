import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { PRIVACY } from "@/data/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — Vinara Infra LLP",
  description: "What personal information Vinara Infra LLP receives through this website, how it is used and the choices you have.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={PRIVACY} related={{ href: "/terms", label: "Read our Terms & Conditions" }} />;
}
