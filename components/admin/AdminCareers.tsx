"use client";

import { useState } from "react";
import { Lock, Pencil, Plus, Trash2, Unlock } from "lucide-react";
import type { JobRow } from "@/lib/db";
import { Modal, PreviewFrame, ViewTabs, dangerBtn, field, label, outlineBtn, primaryBtn, request, type View } from "./parts";

const TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

type Filter = "all" | "open" | "closed";

function JobForm({
  item,
  departments,
  onDone,
  onCancel,
}: {
  item: JobRow | null;
  departments: string[];
  onDone: (row: JobRow) => void;
  onCancel: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const body = {
      title: f.get("title"),
      department: f.get("department"),
      location: f.get("location"),
      type: f.get("type"),
      experience: f.get("experience"),
      summary: f.get("summary"),
      responsibilities: String(f.get("responsibilities") ?? "").split("\n"),
      status: item?.status ?? "open",
    };
    const { data, error } = await request<{ item: JobRow }>(
      item ? `/api/admin/careers/${item.id}` : "/api/admin/careers",
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
    <Modal title={item ? "Edit job" : "Add job"} onClose={onCancel}>
      <form onSubmit={submit}>
        <label className={`${label} mt-4`}>
          Job title
          <input name="title" required defaultValue={item?.title} className={field} />
        </label>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className={label}>
            Department
            <input name="department" list="departments" defaultValue={item?.department} className={field} />
            <datalist id="departments">
              {departments.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </label>
          <label className={label}>
            Location
            <input name="location" defaultValue={item?.location} className={field} />
          </label>
          <label className={label}>
            Type
            <select name="type" defaultValue={item?.type ?? "Full-time"} className={field}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className={label}>
            Experience
            <input name="experience" placeholder="2–5 years" defaultValue={item?.experience} className={field} />
          </label>
        </div>
        <label className={`${label} mt-3`}>
          Summary
          <textarea name="summary" rows={3} defaultValue={item?.summary} className={field} />
        </label>
        <label className={`${label} mt-3`}>
          Responsibilities (one per line)
          <textarea name="responsibilities" rows={4} defaultValue={item?.responsibilities.join("\n")} className={field} />
        </label>
        {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-body hover:bg-slate-100">
            Cancel
          </button>
          <button disabled={busy} className={primaryBtn}>
            {busy ? "Saving…" : item ? "Save changes" : "Post job"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default function AdminCareers({ initialItems }: { initialItems: JobRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState<View>("manage");
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<JobRow | "new" | null>(null);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");

  const shown = items.filter((j) => filter === "all" || j.status === filter);
  const departments = [...new Set(items.map((j) => j.department).filter(Boolean))];
  const openCount = items.filter((j) => j.status === "open").length;

  function saved(row: JobRow) {
    setItems((cur) => (cur.some((i) => i.id === row.id) ? cur.map((i) => (i.id === row.id ? row : i)) : [...cur, row]));
    setEditing(null);
    setVersion((v) => v + 1);
  }

  async function toggle(job: JobRow) {
    const { data, error } = await request<{ item: JobRow }>(`/api/admin/careers/${job.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...job, status: job.status === "open" ? "closed" : "open" }),
    });
    if (error || !data) return setError(error ?? "Could not update the job.");
    setError("");
    saved(data.item);
  }

  async function remove(job: JobRow) {
    if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return;
    const { error } = await request(`/api/admin/careers/${job.id}`, { method: "DELETE" });
    if (error) return setError(error);
    setError("");
    setItems((cur) => cur.filter((i) => i.id !== job.id));
    setVersion((v) => v + 1);
  }

  const filterBtn = (f: Filter, text: string) => (
    <button
      onClick={() => setFilter(f)}
      className={`rounded-full px-3 py-1 text-caption ${filter === f ? "bg-[#0f2b57] text-white" : "border border-[#0f2b57]/20"}`}
    >
      {text}
    </button>
  );

  return (
    <section>
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="font-display text-xl font-bold">Careers</h2>
        <span className="text-caption text-[#5a6b84]">
          {openCount} open · {items.length - openCount} closed
        </span>
        <ViewTabs view={view} setView={setView} />
      </div>
      {error ? <p className="mt-3 text-caption text-red-600">{error}</p> : null}

      {view === "manage" ? (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button onClick={() => setEditing("new")} className={primaryBtn}>
              <Plus size={18} /> Add job
            </button>
            <div className="flex gap-2">
              {filterBtn("all", "All")}
              {filterBtn("open", "Open")}
              {filterBtn("closed", "Closed")}
            </div>
          </div>
          <div className="mt-5 divide-y divide-[#0f2b57]/10 overflow-hidden rounded-xl bg-white shadow-sm">
            {shown.map((job) => (
              <article key={job.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="truncate font-semibold">{job.title}</h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-label uppercase tracking-[0.06em] ${
                        job.status === "open" ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-caption text-[#5a6b84]">
                    {[job.department, job.location, job.type, job.experience].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(job)} className={outlineBtn}>
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => toggle(job)} className={outlineBtn}>
                    {job.status === "open" ? (
                      <>
                        <Lock size={14} /> Close
                      </>
                    ) : (
                      <>
                        <Unlock size={14} /> Reopen
                      </>
                    )}
                  </button>
                  <button onClick={() => remove(job)} className={dangerBtn}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </article>
            ))}
            {shown.length === 0 ? <p className="p-6 text-[#5a6b84]">No jobs here.</p> : null}
          </div>
        </>
      ) : (
        <PreviewFrame src="/careers" version={version} />
      )}

      {editing ? (
        <JobForm
          item={editing === "new" ? null : editing}
          departments={departments}
          onDone={saved}
          onCancel={() => setEditing(null)}
        />
      ) : null}
    </section>
  );
}
