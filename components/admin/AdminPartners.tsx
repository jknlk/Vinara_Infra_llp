"use client";

import { useState } from "react";
import { ImageOff, Pencil, Plus, Trash2 } from "lucide-react";
import type { PartnerCategory, PartnerRow } from "@/lib/db";
import { partnerLogo } from "@/lib/partnerLogos";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

const GROUPS: { category: PartnerCategory; label: string }[] = [
  { category: "client", label: "Clients" },
  { category: "pmc", label: "PMC partners" },
  { category: "tenant", label: "Tenants" },
];

// The logo the site actually shows: an uploaded one, else a bundled file in public/logos.
const logoOf = (p: PartnerRow) => p.logoSrc ?? partnerLogo(p.name)?.src ?? null;

type Editing = { item: PartnerRow | null; category: PartnerCategory };

function PartnerForm({
  editing,
  onDone,
  onCancel,
}: {
  editing: Editing;
  onDone: (row: PartnerRow) => void;
  onCancel: () => void;
}) {
  const { item } = editing;
  const current = item ? logoOf(item) : null;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await request<{ item: PartnerRow }>(
      item ? `/api/admin/partners/${item.id}` : "/api/admin/partners",
      { method: item ? "PATCH" : "POST", body: new FormData(e.currentTarget) }
    );
    if (error || !data) {
      setError(error ?? "Something went wrong.");
      setBusy(false);
      return;
    }
    onDone(data.item);
  }

  return (
    <Modal title={item ? "Edit entry" : "Add entry"} onClose={onCancel}>
      <form onSubmit={submit}>
        <label className={`${label} mt-4`}>
          Name
          <input name="name" required autoFocus defaultValue={item?.name} className={field} />
        </label>
        <label className={`${label} mt-3`}>
          Group
          <select name="category" defaultValue={item?.category ?? editing.category} className={field}>
            {GROUPS.map((g) => (
              <option key={g.category} value={g.category}>
                {g.label}
              </option>
            ))}
          </select>
        </label>
        <div className={`${label} mt-3`}>
          Logo
          {current ? (
            <div className="mt-1.5 flex items-center gap-3 rounded-lg border border-[#0f2b57]/20 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current} alt="" className="h-10 max-w-[160px] object-contain" />
              {item?.logoSrc ? (
                <label className="ml-auto flex items-center gap-2 normal-case tracking-normal text-body text-red-600">
                  <input type="checkbox" name="removeLogo" /> Delete uploaded logo
                </label>
              ) : (
                <span className="ml-auto normal-case tracking-normal text-caption">Built-in logo</span>
              )}
            </div>
          ) : null}
          <input type="file" name="logo" accept="image/*" className={field} />
          <input name="logoUrl" placeholder="…or paste an https image URL" className={field} />
          <span className="mt-1 block normal-case tracking-normal text-caption">
            A transparent PNG or SVG looks best. Uploading replaces the current logo.
          </span>
        </div>
        <fieldset className="mt-4 flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-body">
            <input type="checkbox" name="showLogo" defaultChecked={item?.showLogo ?? true} /> Show logo
          </label>
          <label className="flex items-center gap-2 text-body">
            <input type="checkbox" name="showName" defaultChecked={item?.showName ?? true} /> Show name
          </label>
        </fieldset>
        <p className="mt-1 text-caption text-[#5a6b84]">
          Untick both to hide this entry from the home page marquee. It still shows in the Projects page list.
        </p>
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : item ? "Save changes" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminPartners({ initialItems }: { initialItems: PartnerRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("manage");
  const [editing, setEditing] = useState<Editing | null>(null);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");

  function saved(row: PartnerRow) {
    setItems((cur) => (cur.some((i) => i.id === row.id) ? cur.map((i) => (i.id === row.id ? row : i)) : [...cur, row]));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  async function remove(p: PartnerRow) {
    if (!confirm(`Delete "${p.name}"? This cannot be undone.`)) return;
    const { error } = await request(`/api/admin/partners/${p.id}`, { method: "DELETE" });
    if (error) return setError(error);
    setError("");
    setItems((cur) => cur.filter((i) => i.id !== p.id));
    setVersion((v) => v + 1);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">Clients &amp; partners</h2>
        <span className="text-caption text-[#5a6b84]">{items.length} entries</span>
        <ViewTabs view={view} setView={setView} />
      </div>
      {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}

      {view === "manage" ? (
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {GROUPS.map((g) => {
            const rows = items.filter((i) => i.category === g.category);
            return (
              <div key={g.category} className="overflow-hidden rounded-xl bg-white shadow-sm">
                <div className="flex items-center justify-between border-b-2 border-[#3e86d0] p-4">
                  <h3 className="font-display text-body-l font-bold">{g.label}</h3>
                  <button onClick={() => setEditing({ item: null, category: g.category })} className={primaryBtn}>
                    <Plus size={16} /> Add
                  </button>
                </div>
                <ul className="divide-y divide-[#0f2b57]/10">
                  {rows.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 p-3">
                      <span className="flex h-8 w-16 shrink-0 items-center justify-center">
                        {logoOf(p) ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={logoOf(p)!} alt="" className={`max-h-8 max-w-16 object-contain ${p.showLogo ? "" : "opacity-30 grayscale"}`} />
                        ) : (
                          <ImageOff size={16} className="text-[#5a6b84]/50" />
                        )}
                      </span>
                      <span className={`min-w-0 flex-1 truncate ${p.showName ? "" : "text-[#5a6b84] line-through"}`}>{p.name}</span>
                      <button onClick={() => setEditing({ item: p, category: p.category })} className={outlineBtn}>
                        <Pencil size={14} /> Edit
                      </button>
                      <button onClick={() => remove(p)} className={dangerBtn}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </li>
                  ))}
                  {rows.length === 0 ? <li className="p-4 text-[#5a6b84]">No entries yet.</li> : null}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <PreviewFrame src="/#trusted-by" version={version} />
      )}

      {editing ? <PartnerForm editing={editing} onDone={saved} onCancel={() => setEditing(null)} /> : null}
    </section>
  );
}
