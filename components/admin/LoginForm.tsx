"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);

  async function post(url: string, body: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { res, data: await res.json().catch(() => null) };
  }

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    const f = new FormData(e.currentTarget);
    const { res, data } = await post("/api/admin/login", { username: f.get("username"), password: f.get("password") });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    setLocked(Boolean(data?.locked));
    setError(data?.error ?? "Login failed.");
    setBusy(false);
  }

  async function onForgot(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const { res, data } = await post("/api/admin/forgot", { username: f.get("username") });
    if (res.ok) setNotice(data?.message ?? "Check the admin email for a reset link.");
    else setError(data?.error ?? "Could not send the reset link.");
    setBusy(false);
  }

  const switchTo = (m: "login" | "forgot") => {
    setMode(m);
    setError("");
    setNotice("");
  };

  const input =
    "mt-2 w-full rounded-lg border border-[#0f2b57]/20 bg-white px-3 py-2.5 text-body outline-none focus:border-[#3e86d0]";
  const label = "mt-4 block text-label uppercase tracking-[0.08em] text-[#5a6b84]";
  const submit =
    "mt-6 w-full rounded-lg bg-[#0f2b57] py-3 text-body font-semibold text-white transition-colors hover:bg-[#3e86d0] disabled:opacity-60";
  const link = "mt-4 block text-caption font-medium text-[#3e86d0] hover:underline";

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl shadow-[#0f2b57]/10">
      <h1 className="font-display text-3xl font-bold">{mode === "login" ? "Admin login" : "Reset password"}</h1>
      <p className="mt-1 text-caption text-[#5a6b84]">Vinara Infra LLP</p>

      {mode === "login" ? (
        <form onSubmit={onLogin} className="mt-2">
          <label className={label}>
            Username
            <input name="username" autoComplete="username" required maxLength={200} className={input} />
          </label>
          <label className={label}>
            Password
            <input name="password" type="password" autoComplete="current-password" required maxLength={200} className={input} />
          </label>
          {error ? <p role="alert" className="mt-4 text-caption text-red-600">{error}</p> : null}
          <button disabled={busy || locked} className={submit}>
            {busy ? "Signing in…" : locked ? "Locked" : "Sign in"}
          </button>
          <button type="button" onClick={() => switchTo("forgot")} className={link}>
            Forgot password?
          </button>
        </form>
      ) : (
        <form onSubmit={onForgot} className="mt-2">
          <p className="mt-4 text-caption text-[#5a6b84]">
            Enter the admin username. A single-use link, valid for 30 minutes, is emailed to the admin inbox.
          </p>
          <label className={label}>
            Username
            <input name="username" autoComplete="username" required maxLength={200} className={input} />
          </label>
          {error ? <p role="alert" className="mt-4 text-caption text-red-600">{error}</p> : null}
          {notice ? <p role="status" className="mt-4 text-caption text-emerald-700">{notice}</p> : null}
          <button disabled={busy || Boolean(notice)} className={submit}>
            {busy ? "Sending…" : "Email reset link"}
          </button>
          <button type="button" onClick={() => switchTo("login")} className={link}>
            Back to sign in
          </button>
        </form>
      )}
    </div>
  );
}
