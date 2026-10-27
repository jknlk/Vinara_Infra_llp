"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password") ?? "");
    if (password !== f.get("confirm")) {
      setError("The passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (res.ok) setDone(true);
    else setError((await res.json().catch(() => null))?.error ?? "Could not reset the password.");
    setBusy(false);
  }

  const input =
    "mt-2 w-full rounded-lg border border-[#0f2b57]/20 bg-white px-3 py-2.5 text-body outline-none focus:border-[#3e86d0]";
  const label = "mt-4 block text-label uppercase tracking-[0.08em] text-[#5a6b84]";

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-[#0f2b57]/10">
      <h1 className="font-display text-3xl font-bold">New password</h1>
      <p className="mt-1 text-caption text-[#5a6b84]">Vinara Infra LLP</p>
      {done ? (
        <>
          <p role="status" className="mt-6 text-body text-emerald-700">
            Password updated. Every signed-in session has been logged out.
          </p>
          <Link
            href="/admin/login"
            className="mt-6 block w-full rounded-lg bg-[#0f2b57] py-3 text-center text-body font-semibold text-white"
          >
            Sign in
          </Link>
        </>
      ) : !token ? (
        <p className="mt-6 text-body text-red-600">
          This reset link is incomplete.{" "}
          <Link href="/admin/login" className="underline">
            Request a new one
          </Link>
          .
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-2">
          <label className={label}>
            New password
            <input name="password" type="password" autoComplete="new-password" required minLength={10} maxLength={200} className={input} />
          </label>
          <label className={label}>
            Confirm password
            <input name="confirm" type="password" autoComplete="new-password" required minLength={10} maxLength={200} className={input} />
          </label>
          <p className="mt-2 text-caption text-[#5a6b84]">At least 10 characters, with letters and numbers.</p>
          {error ? <p role="alert" className="mt-4 text-caption text-red-600">{error}</p> : null}
          <button
            disabled={busy}
            className="mt-6 w-full rounded-lg bg-[#0f2b57] py-3 text-body font-semibold text-white transition-colors hover:bg-[#3e86d0] disabled:opacity-60"
          >
            {busy ? "Saving…" : "Set password"}
          </button>
        </form>
      )}
    </div>
  );
}
