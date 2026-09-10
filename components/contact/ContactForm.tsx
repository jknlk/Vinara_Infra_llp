"use client";

import { useState } from "react";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  brief: string;
};

const EMPTY: FormState = { name: "", company: "", email: "", phone: "", brief: "" };

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

  function field(name: keyof FormState, label: string, type = "text") {
    return (
      <div>
        <label htmlFor={name} className="block text-caption uppercase tracking-[0.08em] text-grey-300">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            rows={4}
            value={values[name]}
            onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            className="mt-2 w-full border-b border-navy-500 bg-transparent py-2 text-body text-white outline-none focus:border-orange-500"
          />
        ) : (
          <input
            id={name}
            type={type}
            value={values[name]}
            onChange={(e) => setValues((v) => ({ ...v, [name]: e.target.value }))}
            className="mt-2 w-full border-b border-navy-500 bg-transparent py-2 text-body text-white outline-none focus:border-orange-500"
          />
        )}
        {errors[name] ? <p className="mt-1 text-caption text-orange-300">{errors[name]}</p> : null}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-[4px] border border-green-500/40 bg-green-500/10 p-8">
        <h3 className="text-body-l font-display font-bold text-green-500">Thank you, {values.name.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-[52ch] text-body text-grey-300">
          Your enquiry has been received. A senior team member will acknowledge it within 24 hours and follow up
          with an approach note and indicative programme.
        </p>
        <button
          onClick={() => {
            setValues(EMPTY);
            setSubmitted(false);
          }}
          className="mt-6 text-caption font-semibold text-sky-200 hover:text-sky-400"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {field("name", "Full name")}
      {field("company", "Company")}
      {field("email", "Email", "email")}
      {field("phone", "Phone", "tel")}
      <div className="sm:col-span-2">{field("brief", "Project brief", "textarea")}</div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="rounded-full bg-white px-8 py-4 text-body font-semibold text-ink hover:bg-sky-200"
        >
          Send enquiry
        </button>
      </div>
    </form>
  );
}
