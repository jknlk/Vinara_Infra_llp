import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { TERMS } from "@/data/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions — Vinara Infra LLP",
  description: "The terms that apply when you browse the Vinara Infra LLP website, request a quote or get in touch.",
};

export default function TermsPage() {
  return <LegalDocument doc={TERMS} related={{ href: "/privacy", label: "Read our Privacy Policy" }} />;
}
