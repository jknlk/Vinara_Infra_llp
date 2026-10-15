"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Clock,
  Factory,
  Layers,
  Mail,
  MapPin,
  MessageSquare,
  PencilRuler,
  Phone,
  Route,
  ShieldCheck,
  Truck,
  User,
  Warehouse,
} from "lucide-react";
import { useLenis } from "@/components/providers/SmoothScroll";

type Brief = {
  services: string[];
  area: string;
  timeline: string;
  stage: string;
  location: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

type Errors = Partial<Record<keyof Brief, string>>;

const EMPTY: Brief = {
  services: [],
  area: "",
  timeline: "",
  stage: "",
  location: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  notes: "",
};

const SERVICES = [
  { id: "warehousing", label: "Warehousing & Logistics", hint: "Grade-A warehouses, distribution and fulfilment centres", icon: Warehouse },
  { id: "industrial", label: "Industrial Construction", hint: "Factories, manufacturing and utility buildings", icon: Factory },
  { id: "precast", label: "Precast Construction", hint: "Wall panels and structural components, fast-track", icon: Layers },
  { id: "infrastructure", label: "Infrastructure Development", hint: "Roads, storm water drainage, utility networks", icon: Route },
  { id: "rmc", label: "RMC & Concrete Supply", hint: "M10 to M50, design mix and pumpable concrete", icon: Truck },
  { id: "design-build", label: "Design-Build / Other", hint: "Turnkey delivery, or something else entirely", icon: PencilRuler },
] as const;

const AREAS = ["Under 50,000 sq ft", "50,000 – 2 lakh sq ft", "2 – 5 lakh sq ft", "5 lakh sq ft +", "Not sure yet"];
const TIMELINES = ["Immediately", "Within 3 months", "3 – 6 months", "6 months +", "Just exploring"];
const STAGES = ["Concept", "Design ready", "Tendering", "Under construction"];

const STEPS = [
  { title: "What are you building?", sub: "Pick everything that applies." },
  { title: "Scope & timing", sub: "Rough numbers are fine — we refine them together." },
  { title: "Where do we send the quote?", sub: "A senior team member replies personally." },
];

const QUOTE_EMAIL = "agm@vinara.co.in";
const QUOTE_PHONE = "8971500945";

const REQUIRED: (keyof Brief)[] = ["services", "area", "timeline", "location", "name", "company", "email", "phone"];

function validateStep(step: number, b: Brief): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (b.services.length === 0) e.services = "Select at least one type of work.";
  } else if (step === 1) {
    if (!b.area) e.area = "Choose an approximate size.";
    if (!b.location.trim()) e.location = "Enter the project location.";
    if (!b.timeline) e.timeline = "Choose when you want to start.";
  } else {
    if (!b.name.trim()) e.name = "Enter your full name.";
    if (!b.company.trim()) e.company = "Enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(b.phone)) e.phone = "Enter a valid phone number.";
  }
  return e;
}

function serviceLabels(ids: string[]) {
  return SERVICES.filter((s) => ids.includes(s.id)).map((s) => s.label);
}

function mailtoHref(b: Brief) {
  const lines = [
    `Project type: ${serviceLabels(b.services).join(", ")}`,
    `Built-up area: ${b.area}`,
    `Location: ${b.location}`,
    `Start: ${b.timeline}`,
    b.stage ? `Stage: ${b.stage}` : "",
    "",
    `Name: ${b.name}`,
    `Company: ${b.company}`,
    `Email: ${b.email}`,
    `Phone: ${b.phone}`,
    b.notes.trim() ? `\nNotes:\n${b.notes.trim()}` : "",
  ].filter((l, i, all) => l !== "" || all[i - 1] !== "");
  return `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent(`Quote request — ${b.company}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

const slide = {
  enter: (dir: number) => ({ x: dir * 36, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -36, opacity: 0 }),
};

export default function QuoteStudio() {
  const [brief, setBrief] = useState<Brief>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const filled = REQUIRED.filter((k) => (k === "services" ? brief.services.length > 0 : brief[k].toString().trim())).length;
  const progress = submitted ? 100 : Math.round((filled / REQUIRED.length) * 100);

  function set<K extends keyof Brief>(key: K, value: Brief[K]) {
    setBrief((b) => ({ ...b, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function toggleService(id: string) {
    set("services", brief.services.includes(id) ? brief.services.filter((s) => s !== id) : [...brief.services, id]);
  }

  // Steps differ in height, so keep the top of the card in view when it changes.
  function revealCard() {
    const card = cardRef.current;
    if (!card || card.getBoundingClientRect().top >= 96) return;
    if (lenis) lenis.scrollTo(card, { offset: -104 });
    else card.scrollIntoView({ block: "start" });
  }

  function go(to: number) {
    setDir(to > step ? 1 : -1);
    setStep(to);
    revealCard();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateStep(step, brief);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (step < STEPS.length - 1) go(step + 1);
    else {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          fields: {
            name: brief.name,
            email: brief.email,
            phone: brief.phone,
            company: brief.company,
            projectType: serviceLabels(brief.services).join(", "),
            area: brief.area,
            location: brief.location,
            start: brief.timeline,
            stage: brief.stage,
            notes: brief.notes,
          },
        }),
      }).catch(() => null);
      if (!res?.ok) {
        setErrors({ notes: "Could not send your brief. Please try again or use the email button." });
        return;
      }
      setSubmitted(true);
      revealCard();
    }
  }

  function reset() {
    setBrief(EMPTY);
    setErrors({});
    setDir(-1);
    setStep(0);
    setSubmitted(false);
  }

  function chips(name: "area" | "timeline" | "stage", label: string, options: string[], optional = false) {
    return (
      <fieldset>
        <legend className="mb-2.5 text-label font-semibold uppercase tracking-[0.08em] text-grey-500">
          {label}
          {optional ? <span className="ml-1.5 normal-case tracking-normal text-grey-300">optional</span> : null}
        </legend>
        <div className="flex flex-wrap gap-2">
          {options.map((o) => {
            const on = brief[name] === o;
            return (
              <button
                key={o}
                type="button"
                aria-pressed={on}
                onClick={() => set(name, on && optional ? "" : o)}
                className={`rounded-full border px-4 py-2 text-caption font-medium transition-all ${
                  on
                    ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "border-grey-300/40 bg-white text-ink hover:border-blue-400 hover:bg-blue-50"
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
        {errors[name] ? <p className="mt-2 text-caption text-red-500">{errors[name]}</p> : null}
      </fieldset>
    );
  }

  function input(
    name: "location" | "name" | "company" | "email" | "phone" | "notes",
    label: string,
    placeholder: string,
    Icon: typeof User,
    opts: { type?: string; autoComplete?: string; full?: boolean; optional?: boolean } = {}
  ) {
    const hasError = Boolean(errors[name]);
    const shared = {
      id: `quote-${name}`,
      placeholder,
      value: brief[name],
      onChange: (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(name, ev.target.value),
      className: "w-full bg-transparent text-body text-ink outline-none placeholder:text-grey-300/80",
    };
    return (
      <div className={opts.full ? "sm:col-span-2" : undefined}>
        <label htmlFor={shared.id} className="mb-2 block text-label font-semibold uppercase tracking-[0.08em] text-grey-500">
          {label}
          {opts.optional ? <span className="ml-1.5 normal-case tracking-normal text-grey-300">optional</span> : null}
        </label>
        <div
          className={`group flex items-start gap-3 rounded-2xl border bg-paper px-4 py-3 transition-all focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/15 ${
            hasError ? "border-red-400" : "border-grey-300/30"
          }`}
        >
          <Icon size={18} className={`mt-1 shrink-0 ${hasError ? "text-red-500" : "text-grey-300 group-focus-within:text-blue-600"}`} />
          {name === "notes" ? (
            <textarea rows={3} {...shared} className={`${shared.className} resize-none`} />
          ) : (
            <input type={opts.type ?? "text"} autoComplete={opts.autoComplete} aria-invalid={hasError} {...shared} />
          )}
        </div>
        {hasError ? <p className="mt-1.5 text-caption text-red-500">{errors[name]}</p> : null}
      </div>
    );
  }

  const ticket = [
    { label: "Project type", value: serviceLabels(brief.services).join(" · ") },
    { label: "Built-up area", value: brief.area },
    { label: "Location", value: brief.location.trim() },
    { label: "Start", value: brief.timeline },
    { label: "Stage", value: brief.stage },
    { label: "Contact", value: [brief.name.trim(), brief.company.trim()].filter(Boolean).join(", ") },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#041a42] pb-16 pt-32 md:pb-24 md:pt-40">
      {/* backdrop: glow + blueprint grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_85%_10%,rgba(77,148,255,0.35),transparent_70%),radial-gradient(45%_50%_at_0%_100%,rgba(0,72,176,0.55),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-60 [mask-image:radial-gradient(80%_70%_at_50%_30%,black,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(133,180,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(133,180,255,0.09) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-14">
        {/* left: pitch + live brief */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-label font-semibold uppercase tracking-[0.08em] text-blue-200 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-300" />
              </span>
              Get a quote
            </span>

            <h1 className="mt-6 text-display-l font-display text-white">
              Let&rsquo;s build{" "}
              <span className="join-shine join-shine-dark">together.</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-body-l text-blue-100/80">
              Three quick steps. Tell us what you&rsquo;re building, where and when — our senior team responds within 24
              hours with an approach note and indicative programme.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-caption text-blue-100/90">
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-blue-300" /> Reply within 24 hours
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-300" /> Reviewed by a senior team member
              </span>
            </div>

            {/* live brief — fills in as the form is completed */}
            <div className="mt-10 hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md lg:block">
              <div className="flex items-center justify-between">
                <p className="text-label font-semibold uppercase tracking-[0.08em] text-blue-200">Your brief</p>
                <p className="tabular text-caption font-semibold text-white">{progress}%</p>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-200"
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <dl className="mt-5 divide-y divide-white/10">
                {ticket.map((row) => (
                  <div key={row.label} className="flex items-baseline justify-between gap-6 py-2.5">
                    <dt className="shrink-0 text-caption text-blue-200/70">{row.label}</dt>
                    <dd className="min-w-0 text-right text-caption font-medium text-white">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={row.value || "empty"}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className={`block break-words ${row.value ? "" : "text-white/25"}`}
                        >
                          {row.value || "—"}
                        </motion.span>
                      </AnimatePresence>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:+91${QUOTE_PHONE}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-caption font-semibold text-white transition-colors hover:bg-white/15"
              >
                <Phone size={15} /> +91 {QUOTE_PHONE}
              </a>
              <a
                href={`mailto:${QUOTE_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-caption font-semibold text-white transition-colors hover:bg-white/15"
              >
                <Mail size={15} /> {QUOTE_EMAIL}
              </a>
            </div>
          </motion.div>
        </div>

        {/* right: the builder */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-7"
        >
          <div aria-hidden className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-blue-300/70 via-white/10 to-blue-500/50 blur-[1px]" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:p-9">
            {submitted ? (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/30"
                >
                  <Check size={26} strokeWidth={3} />
                </motion.span>
                <h2 className="mt-6 text-display-m font-display text-ink">Thank you, {brief.name.trim().split(" ")[0]}.</h2>
                <p className="mt-3 max-w-[54ch] text-body text-grey-500">
                  Your brief is ready. A senior team member will acknowledge it within 24 hours and follow up with an
                  approach note and indicative programme.
                </p>

                <dl className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 sm:grid-cols-2">
                  {ticket
                    .filter((row) => row.value)
                    .map((row) => (
                      <div key={row.label}>
                        <dt className="text-label font-semibold uppercase tracking-[0.08em] text-grey-300">{row.label}</dt>
                        <dd className="mt-1 text-body font-medium text-ink">{row.value}</dd>
                      </div>
                    ))}
                </dl>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href={mailtoHref(brief)}
                    className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-body font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
                  >
                    <Mail size={17} /> Email this brief
                  </a>
                  <button type="button" onClick={reset} className="text-caption font-semibold text-blue-600 hover:text-blue-700">
                    Start another quote
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* step rail */}
                <ol className="flex items-center gap-2">
                  {STEPS.map((s, i) => {
                    const done = i < step;
                    const current = i === step;
                    return (
                      <li key={s.title} className="flex flex-1 items-center gap-2 last:flex-none">
                        <button
                          type="button"
                          disabled={!done}
                          onClick={() => go(i)}
                          aria-current={current ? "step" : undefined}
                          aria-label={`Step ${i + 1}: ${s.title}`}
                          className={`tabular grid h-9 w-9 shrink-0 place-items-center rounded-full text-caption font-bold transition-colors ${
                            done
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : current
                                ? "bg-blue-600 text-white ring-4 ring-blue-600/15"
                                : "bg-blue-50 text-grey-300"
                          }`}
                        >
                          {done ? <Check size={16} strokeWidth={3} /> : i + 1}
                        </button>
                        {i < STEPS.length - 1 ? (
                          <span className="h-1 flex-1 overflow-hidden rounded-full bg-blue-50">
                            <motion.span
                              className="block h-full rounded-full bg-blue-600"
                              initial={false}
                              animate={{ width: done ? "100%" : "0%" }}
                              transition={{ duration: 0.45, ease: "easeOut" }}
                            />
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                <div className="mt-7 min-h-[25rem]">
                  <AnimatePresence mode="wait" custom={dir} initial={false}>
                    <motion.div
                      key={step}
                      custom={dir}
                      variants={slide}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="tabular text-label font-semibold uppercase tracking-[0.08em] text-blue-600">
                        Step {step + 1} of {STEPS.length}
                      </p>
                      <h2 className="mt-2 text-display-m font-display text-ink">{STEPS[step].title}</h2>
                      <p className="mt-2 text-body text-grey-500">{STEPS[step].sub}</p>

                      {step === 0 ? (
                        <div className="mt-6">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {SERVICES.map((s) => {
                              const on = brief.services.includes(s.id);
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  aria-pressed={on}
                                  onClick={() => toggleService(s.id)}
                                  className={`group relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                                    on
                                      ? "border-blue-600 bg-blue-50 shadow-[0_10px_30px_-12px_rgba(0,72,176,0.45)]"
                                      : "border-grey-300/30 bg-white hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_10px_30px_-14px_rgba(0,72,176,0.35)]"
                                  }`}
                                >
                                  <span
                                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors ${
                                      on ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
                                    }`}
                                  >
                                    <s.icon size={20} strokeWidth={1.75} />
                                  </span>
                                  <span className="min-w-0 pr-6">
                                    <span className="block text-body font-semibold leading-snug text-ink">{s.label}</span>
                                    <span className="mt-1 block text-caption text-grey-500">{s.hint}</span>
                                  </span>
                                  <span
                                    className={`absolute right-3.5 top-3.5 grid h-5 w-5 place-items-center rounded-full border transition-all ${
                                      on ? "scale-100 border-blue-600 bg-blue-600 text-white" : "scale-90 border-grey-300/50 text-transparent"
                                    }`}
                                  >
                                    <Check size={12} strokeWidth={3.5} />
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.services ? <p className="mt-3 text-caption text-red-500">{errors.services}</p> : null}
                        </div>
                      ) : null}

                      {step === 1 ? (
                        <div className="mt-6 space-y-6">
                          {chips("area", "Approx. built-up area", AREAS)}
                          {input("location", "Project location", "City, district or site address", MapPin, { autoComplete: "off" })}
                          {chips("timeline", "When do you want to start?", TIMELINES)}
                          {chips("stage", "Project stage", STAGES, true)}
                        </div>
                      ) : null}

                      {step === 2 ? (
                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          {input("name", "Full name", "Your name", User, { autoComplete: "name" })}
                          {input("company", "Company", "Your organisation", Building2, { autoComplete: "organization" })}
                          {input("email", "Email", "you@company.com", Mail, { type: "email", autoComplete: "email" })}
                          {input("phone", "Phone", "+91", Phone, { type: "tel", autoComplete: "tel" })}
                          {input("notes", "Anything else?", "Drawings available, special requirements, budget range…", MessageSquare, {
                            full: true,
                            optional: true,
                          })}
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-blue-100 pt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => go(step - 1)}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-body font-semibold text-grey-500 transition-colors hover:text-ink"
                    >
                      <ArrowLeft size={18} /> Back
                    </button>
                  ) : (
                    <span className="text-caption text-grey-300">Takes about a minute</span>
                  )}
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-body font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
                  >
                    {step === STEPS.length - 1 ? "Request quote" : "Continue"}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
