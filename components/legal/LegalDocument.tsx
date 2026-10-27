import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { CONTACT } from "@/data/content/site";
import type { LegalDoc } from "@/data/content/legal";

const sectionId = (i: number) => `section-${i + 1}`;
const num = (i: number) => String(i + 1).padStart(2, "0");

export default function LegalDocument({
  doc,
  related,
}: {
  doc: LegalDoc;
  related: { href: string; label: string };
}) {
  const email = CONTACT.email;

  return (
    <>
      <section className="border-b border-navy-500 bg-surface pb-14 pt-36 md:pb-16 md:pt-44">
        <Container>
          <p className="flex items-center gap-3 text-label uppercase tracking-[0.14em] text-blue-600">
            <span className="h-px w-10 bg-blue-600" />
            Legal
          </p>
          <h1 className="mt-6 max-w-4xl text-display-l font-display join-shine pb-[0.08em]">{doc.title}</h1>
          <p className="mt-6 max-w-[60ch] text-body-l text-grey-500">{doc.standfirst}</p>
          <p className="mt-6 text-caption text-grey-500">Last updated: {doc.updated}</p>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:sticky lg:top-32 lg:col-span-4 lg:block lg:self-start" data-no-reveal>
            <nav aria-label="On this page" className="rounded-2xl border border-navy-500 bg-surface p-6">
              <p className="text-label uppercase tracking-[0.08em] text-grey-500">On this page</p>
              <ol className="mt-4 space-y-2">
                {doc.sections.map((s, i) => (
                  <li key={s.heading}>
                    <a href={`#${sectionId(i)}`} className="flex gap-3 text-caption text-ink hover:text-blue-600">
                      <span className="tabular text-grey-300">{num(i)}</span>
                      {s.heading}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#contact" className="flex gap-3 text-caption text-ink hover:text-blue-600">
                    <span className="tabular text-grey-300">{num(doc.sections.length)}</span>
                    Contact us
                  </a>
                </li>
              </ol>
            </nav>
          </aside>

          {/* long-form reading copy: opted out of the scroll reveal */}
          <article className="lg:col-span-8" data-no-reveal>
            {doc.sections.map((s, i) => (
              <div
                key={s.heading}
                id={sectionId(i)}
                className="scroll-mt-32 border-b border-navy-500 py-8 first:pt-0"
              >
                <h2 className="flex gap-4 text-body-l font-display font-bold text-ink">
                  <span className="tabular text-blue-400">{num(i)}</span>
                  {s.heading}
                </h2>
                <div className="mt-3 max-w-[70ch] space-y-3 text-body text-grey-500 sm:pl-10">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.points ? (
                    <ul className="list-disc space-y-2 pl-5 marker:text-blue-400">
                      {s.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            ))}

            <div
              id="contact"
              className="mt-10 scroll-mt-32 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white md:p-8"
            >
              <h2 className="text-body-l font-display font-bold">Contact us</h2>
              <p className="mt-2 max-w-[60ch] text-body text-blue-100">
                Questions about this page, or a request about your personal information? Write to us and we will respond.
              </p>
              <address className="mt-5 text-caption not-italic leading-relaxed text-white/90">
                <span className="block font-semibold text-white">Vinara Infra LLP</span>
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`mailto:${email}`}
                className="mt-5 inline-flex items-center gap-2 text-body font-semibold text-white hover:underline"
              >
                <Mail size={18} strokeWidth={1.75} />
                {email}
              </a>
            </div>

            <Link
              href={related.href}
              className="mt-8 inline-flex items-center gap-1.5 text-body font-semibold text-blue-600 hover:underline"
            >
              {related.label}
              <ArrowUpRight size={16} />
            </Link>
          </article>
        </Container>
      </section>
    </>
  );
}
