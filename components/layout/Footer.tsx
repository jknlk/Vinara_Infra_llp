import Link from "next/link";
import Image from "next/image";
import { COMPANY_BLURB, CONTACT, FOOTER_COLUMNS, FOOTER_STAT_STRIP } from "@/data/content/site";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-navy-500 bg-ink pt-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 border-b border-navy-500 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/Vinara Infra LLP logo.png" alt="Vinara Infra LLP" width={36} height={36} className="h-9 w-auto" />
              <span className="text-body-l font-display font-bold text-white">VINARA</span>
            </div>
            <p className="mt-4 text-body-l font-display font-bold text-sky-200">Grow Together</p>
            <p className="mt-4 max-w-[42ch] text-body text-grey-300">{COMPANY_BLURB}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-label uppercase tracking-[0.08em] text-grey-300">{col.heading}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l, i) => (
                    <li key={col.heading + l.label + i}>
                      <Link href={l.href} className="text-caption text-grey-300 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="text-label uppercase tracking-[0.08em] text-grey-300">Head office</p>
            <address className="mt-4 max-w-[28ch] text-caption not-italic leading-relaxed text-grey-300">
              {CONTACT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 text-caption text-grey-300">
              {CONTACT.departments[1].contact}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 py-8 text-caption text-grey-500 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Vinara Infra LLP. All rights reserved.</p>
          <p className="tabular text-grey-300">{FOOTER_STAT_STRIP}</p>
        </div>
      </Container>
    </footer>
  );
}
