"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: f.get("username"), password: f.get("password") }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError((await res.json().catch(() => null))?.error ?? "Login failed.");
      setBusy(false);
    }
  }

  const input =
    "mt-2 w-full rounded-lg border border-[#0f2b57]/20 bg-white px-3 py-2.5 text-body outline-none focus:border-[#3e86d0]";

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-[#0f2b57]/10">
      <h1 className="font-display text-3xl font-bold">Admin login</h1>
      <p className="mt-1 text-caption text-[#5a6b84]">Vinara Infra LLP</p>
      <label className="mt-6 block text-label uppercase tracking-[0.08em] text-[#5a6b84]">
        Username
        <input name="username" autoComplete="username" required className={input} />
      </label>
      <label className="mt-4 block text-label uppercase tracking-[0.08em] text-[#5a6b84]">
        Password
        <input name="password" type="password" autoComplete="current-password" required className={input} />
      </label>
      {error ? <p className="mt-4 text-caption text-red-600">{error}</p> : null}
      <button
        disabled={busy}
        className="mt-6 w-full rounded-lg bg-[#0f2b57] py-3 text-body font-semibold text-white transition-colors hover:bg-[#3e86d0] disabled:opacity-60"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
