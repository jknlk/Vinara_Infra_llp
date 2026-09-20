"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import type { ProjectRow } from "@/lib/db";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

const NUMBER_FIELDS: { name: keyof ProjectRow; text: string; step?: string }[] = [
  { name: "plotAcres", text: "Plot (acres)", step: "0.01" },
  { name: "buildingsCount", text: "Buildings" },
  { name: "builtUpSqft", text: "Built-up (sq.ft)", step: "0.01" },
  { name: "completed", text: "Completed" },
  { name: "wip", text: "In progress" },
];

function ProjectForm({
  item,
  onDone,
  onCancel,
}: {
  item: ProjectRow | null;
  onDone: (row: ProjectRow) => void;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { data, error } = await request<{ item: ProjectRow }>(
      item ? `/api/admin/projects/${item.id}` : "/api/admin/projects",
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
    <Modal title={item ? "Edit project" : "Add project"} onClose={onCancel}>
      <form onSubmit={submit}>
        {shown ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shown} alt="" className="mt-4 h-40 w-full rounded-lg object-cover" />
        ) : null}
        <label className={`${label} mt-4`}>
          {item ? "Replace image (optional)" : "Project image"}
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
        <label className={`${label} mt-3`}>
          Project name
          <input name="name" required defaultValue={item?.name} className={field} />
        </label>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className={label}>
            Client
            <input name="client" defaultValue={item?.client} className={field} />
          </label>
          <label className={label}>
            Location
            <input name="location" defaultValue={item?.location} className={field} />
          </label>
        </div>
        <label className={`${label} mt-3`}>
          Description
          <textarea name="description" rows={3} defaultValue={item?.description} className={field} />
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {NUMBER_FIELDS.map((f) => (
            <label key={f.name} className={label}>
              {f.text}
              <input
                name={f.name}
                type="number"
                min="0"
                step={f.step ?? "1"}
                defaultValue={item ? (item[f.name] as number) : 0}
                className={field}
              />
            </label>
          ))}
        </div>
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : item ? "Save changes" : "Add project"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminProjects({ initialItems, onChange }: { initialItems: ProjectRow[]; onChange?: (items: ProjectRow[]) => void }) {
  const [items, setItems] = useState(initialItems);
  useEffect(() => onChange?.(items), [items, onChange]);
  const [view, setView] = useState<View>("manage");
  const [editing, setEditing] = useState<ProjectRow | "new" | null>(null);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");

  function saved(row: ProjectRow) {
    setItems((cur) => (cur.some((i) => i.id === row.id) ? cur.map((i) => (i.id === row.id ? row : i)) : [...cur, row]));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  async function remove(item: ProjectRow) {
    if (!confirm(`Delete project "${item.name}"? This cannot be undone.`)) return;
    const { error } = await request(`/api/admin/projects/${item.id}`, { method: "DELETE" });
    if (error) return setError(error);
    setError("");
    setItems((cur) => cur.filter((i) => i.id !== item.id));
    setVersion((v) => v + 1);
  }

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">Projects</h2>
        <span className="text-caption text-[#5a6b84]">{items.length} projects</span>
        <ViewTabs view={view} setView={setView} />
      </div>
      {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}

      {view === "manage" ? (
        <>
          <button onClick={() => setEditing("new")} className={`${primaryBtn} mt-5`}>
            <Plus size={18} /> Add project
          </button>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                {p.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.src} alt={p.name} loading="lazy" className="h-44 w-full object-cover" />
                ) : (
                  <div className="grid h-44 place-items-center bg-[#dceaf9] text-[#5a6b84]">
                    <Building2 size={32} />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="truncate font-semibold">{p.name}</h3>
                  <p className="mt-1 truncate text-caption text-[#5a6b84]">{p.client || "—"}</p>
                  <p className="mt-1 flex items-center gap-1 truncate text-caption text-[#5a6b84]">
                    <MapPin size={12} /> {p.location || "—"}
                  </p>
                  <p className="mt-2 text-caption text-[#5a6b84]">
                    {p.plotAcres} acres · {p.buildingsCount} buildings · {p.completed} done · {p.wip} in progress
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => setEditing(p)} className={outlineBtn}>
                      <Pencil size={14} /> Edit
                    </button>
                    <button onClick={() => remove(p)} className={dangerBtn}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {items.length === 0 ? <p className="mt-8 text-[#5a6b84]">No projects yet. Add your first one.</p> : null}
        </>
      ) : (
        <PreviewFrame src="/projects" version={version} />
      )}

      {editing ? (
        <ProjectForm item={editing === "new" ? null : editing} onDone={saved} onCancel={() => setEditing(null)} />
      ) : null}
    </section>
  );
}
