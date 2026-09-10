"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  brief: string;
};

const EMPTY: FormState = { name: "", company: "", email: "", phone: "", brief: "" };

export default function ContactFormLight() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: FormState) {
    const e: Partial<FormState> = {};
    if (!v.name.trim()) e.name = "Enter your full name.";
    if (!v.company.trim()) e.company = "Enter your company name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s]{7,15}$/.test(v.phone)) e.phone = "Enter a valid phone number.";
    if (v.brief.trim().length < 10) e.brief = "Tell us a little about scope, location and timelines.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) setSubmitted(true);
  }

  function field(name: keyof FormState, label: string, placeholder: string, type: "text" | "email" | "tel" | "textarea" = "text") {
    return (
      <div>
        <label htmlFor={name} className="block text-label uppercase tracking-[0.08em] text-grey-500">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            rows={3}
            placeholder={placeholder}
            value={values[name]}
            onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            className="mt-2 w-full border-b border-[#E3EAF4] bg-transparent py-2 text-body text-ink placeholder:text-grey-300 outline-none focus:border-blue-500"
          />
        ) : (
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            value={values[name]}
            onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            className="mt-2 w-full border-b border-[#E3EAF4] bg-transparent py-2 text-body text-ink placeholder:text-grey-300 outline-none focus:border-blue-500"
          />
        )}
        {errors[name] ? <p className="mt-1 text-caption text-orange-500">{errors[name]}</p> : null}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
        <h3 className="text-body-l font-display font-bold text-green-500">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-2 text-caption text-grey-500">
          Your enquiry has been received. A senior team member will acknowledge it within 24 hours.
        </p>
        <button
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
          className="mt-4 text-caption font-semibold text-blue-600 hover:text-blue-700"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {field("name", "Full name", "Your name")}
      {field("company", "Company", "Your organization")}
      {field("email", "Email", "you@company.com", "email")}
      {field("phone", "Phone", "+91", "tel")}
      {field("brief", "Project brief", "Tell us about scope, location, timelines...", "textarea")}
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-body font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        Send Enquiry
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
