"use client";

import { useState } from "react";
import { ImagePlus, Pencil, Trash2 } from "lucide-react";
import type { GalleryRow } from "@/lib/db";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

function ItemForm({
  projectNames,
  defaultProject,
  item,
  onDone,
  onCancel,
}: {
  projectNames: string[];
  defaultProject?: string;
  item: GalleryRow | null;
  onDone: (row: GalleryRow) => void;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await request<{ item: GalleryRow }>(
      item ? `/api/admin/gallery/${item.id}` : "/api/admin/gallery",
      { method: item ? "PATCH" : "POST", body: new FormData(e.currentTarget) }
    );
    if (error || !data) {
      setError(error ?? "Something went wrong.");
      setBusy(false);
      return;
    }
    onDone(data.item);
  }

  const shown = preview ?? item?.src;

  return (
    <Modal title={item ? "Edit image" : "Add image"} onClose={onCancel}>
      <form onSubmit={submit}>
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt="" className="mt-4 h-44 w-full rounded-lg object-cover" />
        ) : null}
        <label className={`${label} mt-4`}>
          {item ? "Replace image (optional)" : "Image file"}
          <input
            name="file"
            type="file"
            accept="image/*"
            className={field}
            onChange={(e) => {
              const f = e.target.files?.[0];
              setPreview(f ? URL.createObjectURL(f) : null);
            }}
          />
        </label>
        {!item ? (
          <label className={`${label} mt-3`}>
            …or image URL
            <input name="url" type="url" placeholder="https://" className={field} />
          </label>
        ) : null}
        <label className={`${label} mt-3`}>
          Title
          <input name="title" required defaultValue={item?.title} className={field} />
        </label>
        <label className={`${label} mt-3`}>
          Description
          <textarea name="description" rows={3} defaultValue={item?.description} className={field} />
        </label>
        <label className={`${label} mt-3`}>
          Project
          <select name="categories" defaultValue={item?.categories[0] ?? defaultProject ?? projectNames[0]} className={field}>
            {projectNames.map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label className={`${label} mt-3`}>
          Alt text (optional)
          <input name="alt" defaultValue={item?.alt} className={field} />
        </label>
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : item ? "Save changes" : "Upload"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminGallery({ initialItems, projectNames }: { initialItems: GalleryRow[]; projectNames: string[] }) {
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("manage");
  const [editing, setEditing] = useState<GalleryRow | { newFor: string } | null>(null);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");

  function saved(row: GalleryRow) {
    setItems((cur) => (cur.some((i) => i.id === row.id) ? cur.map((i) => (i.id === row.id ? row : i)) : [...cur, row]));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  async function remove(item: GalleryRow) {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    const { error } = await request(`/api/admin/gallery/${item.id}`, { method: "DELETE" });
    if (error) return setError(error);
    setError("");
    setItems((cur) => cur.filter((i) => i.id !== item.id));
    setVersion((v) => v + 1);
  }

  const groups = [
    ...projectNames.map((name) => ({ name, list: items.filter((i) => i.categories[0] === name) })),
    { name: "Unassigned", list: items.filter((i) => !projectNames.includes(i.categories[0])) },
  ].filter((g) => g.name !== "Unassigned" || g.list.length > 0);

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">Gallery</h2>
        <span className="text-caption text-[#5a6b84]">{items.length} photos</span>
        <ViewTabs view={view} setView={setView} />
      </div>
      {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}

      {view === "manage" ? (
        <>
          {groups.map(({ name, list }) => (
            <div key={name} className="mt-8">
              <div className="flex items-center gap-3 border-b border-[#0f2b57]/15 pb-2">
                <h3 className="font-display text-lg font-bold">{name}</h3>
                <span className="text-caption text-[#5a6b84]">{list.length} photos</span>
                {projectNames.includes(name) ? (
                  <button onClick={() => setEditing({ newFor: name })} className={`${primaryBtn} ml-auto !py-1.5 !text-caption`}>
                    <ImagePlus size={16} /> Add image
                  </button>
                ) : null}
              </div>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {list.map((item) => (
                  <article key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.src} alt={item.alt} loading="lazy" className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <h3 className="truncate font-semibold">{item.title}</h3>
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
              {list.length === 0 ? <p className="mt-4 text-caption text-[#5a6b84]">No images yet for this project.</p> : null}
            </div>
          ))}
        </>
      ) : (
        <PreviewFrame src="/gallery" version={version} />
      )}

      {editing ? (
        <ItemForm projectNames={projectNames} defaultProject={"newFor" in editing ? editing.newFor : undefined} item={"newFor" in editing ? null : editing} onDone={saved} onCancel={() => setEditing(null)} />
      ) : null}
    </section>
  );
}
