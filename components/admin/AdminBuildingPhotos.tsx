"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import type { BuildingPhotoRow } from "@/lib/db";
import { PROJECTS } from "@/data/buildings";
import { Modal, PreviewFrame, ViewTabs, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

function buildingName(row: BuildingPhotoRow) {
  const project = PROJECTS.find((p) => p.slug === row.projectSlug);
  return project?.buildings.find((b) => b.id === row.buildingId)?.name ?? row.buildingId;
}

function PhotoForm({
  item,
  onDone,
  onCancel,
}: {
  item: BuildingPhotoRow;
  onDone: (row: BuildingPhotoRow) => void;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await request<{ item: BuildingPhotoRow }>(`/api/admin/building-photos/${item.id}`, {
      method: "PATCH",
      body: new FormData(e.currentTarget),
    });
    if (error || !data) {
      setError(error ?? "Something went wrong.");
      setBusy(false);
      return;
    }
    onDone(data.item);
  }

  return (
    <Modal title={`${buildingName(item)} photo`} onClose={onCancel}>
      <form onSubmit={submit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview ?? item.src} alt="" className="mt-4 h-48 w-full rounded-lg object-cover" />
        <label className={`${label} mt-4`}>
          Replace image (optional)
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
        <p className="mt-1.5 text-caption text-[#5a6b84]">A wide landscape drone shot works best.</p>
        <label className={`${label} mt-3`}>
          Caption (optional)
          <textarea
            name="caption"
            rows={3}
            defaultValue={item.caption}
            placeholder="Leave empty to show the building's area and share of the site."
            className={field}
          />
        </label>
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminBuildingPhotos({ initialItems }: { initialItems: BuildingPhotoRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("manage");
  const [editing, setEditing] = useState<BuildingPhotoRow | null>(null);
  const [version, setVersion] = useState(0);

  function saved(row: BuildingPhotoRow) {
    setItems((cur) => cur.map((i) => (i.id === row.id ? row : i)));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">Building photos</h2>
        <span className="text-caption text-[#5a6b84]">{items.length} photos · shown in the scrolling showcase on the Projects page</span>
        <ViewTabs view={view} setView={setView} />
      </div>

      {view === "manage" ? (
        PROJECTS.map((project) => {
          const rows = items.filter((i) => i.projectSlug === project.slug);
          if (!rows.length) return null;
          return (
            <div key={project.slug} className="mt-6">
              <h3 className="border-b-2 border-[#3e86d0] pb-2 font-display text-body-l font-bold">{project.name}</h3>
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rows.map((p) => (
                  <article key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={buildingName(p)} loading="lazy" className="h-44 w-full object-cover" />
                    <div className="p-4">
                      <h4 className="truncate font-semibold">{buildingName(p)}</h4>
                      <p className="mt-1 line-clamp-2 text-caption text-[#5a6b84]">{p.caption || "Default caption"}</p>
                      <button onClick={() => setEditing(p)} className={`${outlineBtn} mt-3`}>
                        <Pencil size={14} /> Edit
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <PreviewFrame src="/projects" version={version} />
      )}

      {editing ? <PhotoForm item={editing} onDone={saved} onCancel={() => setEditing(null)} /> : null}
    </section>
  );
}
