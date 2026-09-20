"use client";

import { X } from "lucide-react";

export const field =
  "mt-1.5 w-full rounded-lg border border-[#0f2b57]/20 bg-white px-3 py-2 text-body outline-none focus:border-[#3e86d0]";
export const label = "block text-label uppercase tracking-[0.08em] text-[#5a6b84]";
export const primaryBtn =
  "flex items-center gap-2 rounded-lg bg-[#0f2b57] px-4 py-2.5 text-body font-semibold text-white hover:bg-[#3e86d0] disabled:opacity-60";
export const outlineBtn =
  "flex items-center gap-1.5 rounded-lg border border-[#0f2b57]/20 px-3 py-1.5 text-caption hover:border-[#0f2b57]";
export const dangerBtn =
  "flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-caption text-red-600 hover:bg-red-50";

export type View = "manage" | "preview";

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-20 grid place-items-start overflow-auto bg-[#0b2247]/60 p-4 sm:place-items-center">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ViewTabs({ view, setView }: { view: View; setView: (v: View) => void }) {
  const btn = (v: View, text: string) => (
    <button
      onClick={() => setView(v)}
      className={`rounded-full px-4 py-2 text-caption font-medium ${
        view === v ? "bg-[#0f2b57] text-white" : "border border-[#0f2b57]/20 hover:border-[#0f2b57]"
      }`}
    >
      {text}
    </button>
  );
  return (
    <div className="ml-auto flex gap-2">
      {btn("manage", "Manage")}
      {btn("preview", "Preview page")}
    </div>
  );
}

export function PreviewFrame({ src, version }: { src: string; version: number }) {
  return (
    <div className="mt-5">
      <a href={src} target="_blank" className="mb-3 inline-block text-caption text-[#3e86d0] hover:underline">
        Open {src} in a new tab ↗
      </a>
      <iframe
        key={version}
        src={src}
        title={`${src} preview`}
        className="h-[80vh] w-full rounded-xl border border-[#0f2b57]/15 bg-white"
      />
    </div>
  );
}

export async function request<T>(url: string, init?: RequestInit): Promise<{ data?: T; error?: string }> {
  const res = await fetch(url, init);
  const body = await res.json().catch(() => ({}));
  return res.ok ? { data: body as T } : { error: body.error ?? "Something went wrong." };
}
