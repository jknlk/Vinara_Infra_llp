"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { PartnerCategory, PartnerRow } from "@/lib/db";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

const GROUPS: { category: PartnerCategory; label: string }[] = [
  { category: "client", label: "Clients" },
  { category: "pmc", label: "PMC partners" },
  { category: "tenant", label: "Tenants" },
];

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
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const body = { name: f.get("name"), category: f.get("category") };
    const { data, error } = await request<{ item: PartnerRow }>(
      item ? `/api/admin/partners/${item.id}` : "/api/admin/partners",
      { method: item ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
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
                      <span className="min-w-0 flex-1 truncate">{p.name}</span>
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
        <PreviewFrame src="/projects#clients" version={version} />
      )}

      {editing ? <PartnerForm editing={editing} onDone={saved} onCancel={() => setEditing(null)} /> : null}
    </section>
  );
}
