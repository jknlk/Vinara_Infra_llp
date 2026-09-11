"use client";

import { useState } from "react";
import { ArrowRight, Building2, Check, Mail, MessageSquare, Phone, User } from "lucide-react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  brief: string;
};

const EMPTY: FormState = { name: "", company: "", email: "", phone: "", brief: "" };

const FIELD_META: Record<
  keyof FormState,
  { label: string; placeholder: string; icon: typeof User; type?: string }
> = {
  name: { label: "Full name", placeholder: "Your name", icon: User },
  company: { label: "Company", placeholder: "Your organisation", icon: Building2 },
  email: { label: "Email", placeholder: "you@company.com", icon: Mail, type: "email" },
  phone: { label: "Phone", placeholder: "+91", icon: Phone, type: "tel" },
  brief: { label: "Project brief", placeholder: "Tell us about scope, location, timelines…", icon: MessageSquare },
};

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: FormState) {
    const e: Partial<FormState> = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!v.company.trim()) e.company = "Enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(v.phone)) e.phone = "Enter a valid phone number.";
    if (v.brief.trim().length < 10) e.brief = "Tell us a little more about the project — at least 10 characters.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
    }
  }

  function field(name: keyof FormState, span?: "full") {
    const meta = FIELD_META[name];
    const Icon = meta.icon;
    const hasError = Boolean(errors[name]);

    return (
      <div className={span === "full" ? "sm:col-span-2" : undefined}>
        <label htmlFor={name} className="mb-2 block text-label font-semibold uppercase tracking-[0.08em] text-grey-500">
          {meta.label}
        </label>
        <div
          className={`group flex items-start gap-3 rounded-2xl border bg-paper/60 px-4 py-3 transition-colors focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 ${
            hasError ? "border-orange-400" : "border-grey-200"
          }`}
        >
          <Icon size={18} className={`mt-0.5 shrink-0 ${hasError ? "text-orange-500" : "text-grey-300 group-focus-within:text-blue-600"}`} />
          {name === "brief" ? (
            <textarea
              id={name}
              rows={4}
              placeholder={meta.placeholder}
              value={values[name]}
              onChange={(ev) => setValues((v) => ({ ...v, [name]: ev.target.value }))}
              className="w-full resize-none bg-transparent text-body text-ink outline-none placeholder:text-grey-300"
            />
          ) : (
            <input
              id={name}
              type={meta.type ?? "text"}
              placeholder={meta.placeholder}
              value={values[name]}
              onChange={(ev) => setValues((v) => ({ ...v, [name]: ev.target.value }))}
              className="w-full bg-transparent text-body text-ink outline-none placeholder:text-grey-300"
            />
          )}
        </div>
        {hasError ? <p className="mt-1.5 text-caption text-orange-500">{errors[name]}</p> : null}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[#E3EAF4] bg-white p-6 shadow-[0_30px_60px_-20px_rgba(11,42,91,0.25)] sm:p-10">
      <span className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-50 blur-2xl" aria-hidden />

      <div className="relative flex items-center justify-between gap-4">
        <h3 className="text-display-m font-display font-bold text-ink">Get a Quote</h3>
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-caption font-semibold text-blue-600 sm:inline-flex">
          Reply in 24h
        </span>
      </div>

      {submitted ? (
        <div className="relative mt-8 flex flex-col items-start gap-4 rounded-2xl border border-green-500/20 bg-green-500/5 p-8">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white">
            <Check size={20} strokeWidth={3} />
          </span>
          <div>
            <h4 className="text-body-l font-display font-bold text-ink">Thank you, {values.name.split(" ")[0]}.</h4>
            <p className="mt-2 max-w-[52ch] text-body text-grey-500">
              Your enquiry has been received. A senior team member will acknowledge it within 24 hours and follow up
              with an approach note and indicative programme.
            </p>
          </div>
          <button
            onClick={() => {
              setValues(EMPTY);
              setSubmitted(false);
            }}
            className="text-caption font-semibold text-blue-600 hover:text-blue-700"
          >
            Submit another enquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {field("name")}
          {field("company")}
          {field("email")}
          {field("phone")}
          {field("brief", "full")}
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-body font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Send enquiry
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
