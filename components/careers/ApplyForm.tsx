"use client";

import { useState } from "react";

const FIELD =
  "w-full rounded-xl border border-navy-500 bg-white px-4 py-2.5 text-body text-ink outline-none transition-colors focus:border-blue-600";

export default function ApplyForm({ role }: { role: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setState("sending");
    setError("");
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "application", fields: { role, ...data } }),
    }).catch(() => null);
    if (res?.ok) return setState("sent");
    setState("idle");
    setError((await res?.json().catch(() => null))?.error ?? "Could not send. Please try again.");
  }

  if (state === "sent") {
    return <p className="mt-6 text-body font-medium text-blue-700">Thank you — your application for {role} has been sent.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input name="name" required placeholder="Full name" className={FIELD} />
      <input name="email" type="email" required placeholder="Email" className={FIELD} />
      <input name="phone" type="tel" placeholder="Phone" className={FIELD} />
      <input name="experience" placeholder="Years of experience" className={FIELD} />
      <input name="linkedin" placeholder="LinkedIn / portfolio / resume link" className={FIELD} />
      <textarea name="message" rows={3} placeholder="Short note" className={FIELD} />
      {error ? <p className="text-caption text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-full bg-ink px-6 py-3 text-caption font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : `Apply for ${role}`}
      </button>
    </form>
  );
}
