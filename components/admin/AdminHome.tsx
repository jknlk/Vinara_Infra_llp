"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { HomeRow } from "@/lib/db";
import { HOME_KINDS, type HomeKind } from "@/data/content/homeAdmin";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

function ItemForm({
  kind,
  item,
  onDone,
  onCancel,
}: {
  kind: HomeKind;
  item: HomeRow | null;
  onDone: (r: HomeRow) => void;
  onCancel: () => void;
}) {
  const cfg = HOME_KINDS[kind];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await request<{ item: HomeRow }>(
      item ? `/api/admin/home/${kind}/${item.id}` : `/api/admin/home/${kind}`,
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
    <Modal title={item ? `Edit — ${cfg.title}` : `Add — ${cfg.title}`} onClose={onCancel}>
      <form onSubmit={submit}>
        {cfg.fields.map((f) => (
          <label key={f.key} className={`${label} mt-3 block`}>
            {f.label}
            {f.type === "textarea" ? (
              <textarea name={f.key} rows={3} defaultValue={item?.data[f.key]} className={field} />
            ) : f.type === "select" ? (
              <select name={f.key} defaultValue={item?.data[f.key] ?? f.options?.[0]} className={field}>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input name={f.key} type={f.type === "number" ? "number" : "text"} defaultValue={item?.data[f.key]} className={field} />
            )}
          </label>
        ))}
        {cfg.hasImage ? (
          <>
            {item?.data.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.data.image} alt="" className="mt-4 h-32 w-full rounded-lg object-cover" />
            ) : null}
            <label className={`${label} mt-3 block`}>
              Upload image {item ? "(optional — replaces current)" : ""}
              <input name="file" type="file" accept="image/*" className={field} />
            </label>
            <label className={`${label} mt-3 block`}>
              …or image URL
              <input name="url" type="url" defaultValue={item?.data.image} placeholder="https://" className={field} />
            </label>
          </>
        ) : null}
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminHome({ kind, initialItems }: { kind: HomeKind; initialItems: HomeRow[] }) {
  const cfg = HOME_KINDS[kind];
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("manage");
  const [editing, setEditing] = useState<HomeRow | "new" | null>(null);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");

  function saved(row: HomeRow) {
    setItems((cur) => (cur.some((i) => i.id === row.id) ? cur.map((i) => (i.id === row.id ? row : i)) : [...cur, row]));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  async function remove(item: HomeRow) {
    if (!confirm(`Delete "${item.data[cfg.primary]}"? This cannot be undone.`)) return;
    const { error } = await request(`/api/admin/home/${kind}/${item.id}`, { method: "DELETE" });
    if (error) return setError(error);
    setError("");
    setItems((cur) => cur.filter((i) => i.id !== item.id));
    setVersion((v) => v + 1);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">{cfg.title}</h2>
        <span className="text-caption text-[#5a6b84]">Home page · {items.length} items</span>
        <ViewTabs view={view} setView={setView} />
      </div>
      {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
      {view === "manage" ? (
        <>
          <button onClick={() => setEditing("new")} className={`${primaryBtn} mt-5`}>
            <Plus size={18} /> Add
          </button>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                {cfg.hasImage && item.data.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.data.image} alt="" loading="lazy" className="h-36 w-full object-cover" />
                ) : null}
                <div className="p-4">
                  <h3 className="truncate font-semibold">{item.data[cfg.primary]}</h3>
                  <p className="mt-1 truncate text-caption text-[#5a6b84]">
                    {cfg.fields
                      .filter((f) => f.key !== cfg.primary)
                      .slice(0, 2)
                      .map((f) => item.data[f.key])
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  {kind === "featured" ? (
                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-label uppercase ${
                        item.data.status === "completed" ? "bg-green-100 text-green-700" : "bg-sky-100 text-sky-700"
                      }`}
                    >
                      {item.data.status === "completed" ? "Completed" : "Ongoing"} · {item.data.progress}%
                    </span>
                  ) : null}
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setEditing(item)} className={outlineBtn}>
                      <Pencil size={14} /> Edit
                    </button>
                    <button onClick={() => remove(item)} className={dangerBtn}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {items.length === 0 ? <p className="mt-8 text-[#5a6b84]">Nothing here yet.</p> : null}
        </>
      ) : (
        <PreviewFrame src={cfg.preview} version={version} />
      )}
      {editing ? (
        <ItemForm kind={kind} item={editing === "new" ? null : editing} onDone={saved} onCancel={() => setEditing(null)} />
      ) : null}
    </section>
  );
}
