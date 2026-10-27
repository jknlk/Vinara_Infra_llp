"use client";

import { useState } from "react";
import { KeyRound, X } from "lucide-react";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const close = () => {
    setOpen(false);
    setError("");
    setDone(false);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const next = String(f.get("next") ?? "");
    if (next !== f.get("confirm")) {
      setError("The new passwords don't match.");
      return;
    }
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: f.get("current"), next }),
    });
    if (res.ok) {
      setDone(true);
      form.reset();
    } else {
      setError((await res.json().catch(() => null))?.error ?? "Could not change the password.");
    }
    setBusy(false);
  }

  const input =
    "mt-2 w-full rounded-lg border border-[#0f2b57]/20 bg-white px-3 py-2.5 text-body outline-none focus:border-[#3e86d0]";
  const label = "mt-4 block text-label uppercase tracking-[0.08em] text-[#5a6b84]";

  return (
    <>
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-caption hover:bg-white">
        <KeyRound size={16} /> Change password
      </button>
      {open ? (
        <div className="fixed inset-0 z-[110] grid place-items-center bg-[#0f2b57]/40 px-4" onClick={close}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h2 id="change-password-title" className="font-display text-2xl font-bold">
                Change password
              </h2>
              <button onClick={close} aria-label="Close" className="rounded-lg p-1 hover:bg-[#f2f7fc]">
                <X size={18} />
              </button>
            </div>
            {done ? (
              <p role="status" className="mt-4 text-body text-emerald-700">
                Password changed. Any other signed-in sessions have been logged out.
              </p>
            ) : (
              <form onSubmit={onSubmit}>
                <label className={label}>
                  Current password
                  <input name="current" type="password" autoComplete="current-password" required maxLength={200} className={input} />
                </label>
                <label className={label}>
                  New password
                  <input name="next" type="password" autoComplete="new-password" required minLength={10} maxLength={200} className={input} />
                </label>
                <label className={label}>
                  Confirm new password
                  <input name="confirm" type="password" autoComplete="new-password" required minLength={10} maxLength={200} className={input} />
                </label>
                <p className="mt-2 text-caption text-[#5a6b84]">At least 10 characters, with letters and numbers.</p>
                {error ? <p role="alert" className="mt-4 text-caption text-red-600">{error}</p> : null}
                <button
                  disabled={busy}
                  className="mt-6 w-full rounded-lg bg-[#0f2b57] py-3 text-body font-semibold text-white transition-colors hover:bg-[#3e86d0] disabled:opacity-60"
                >
                  {busy ? "Saving…" : "Update password"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
