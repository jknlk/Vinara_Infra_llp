import type { JobInput } from "@/lib/db";

export function parseJob(body: unknown): JobInput {
  const b = (body ?? {}) as Record<string, unknown>;
  const text = (k: string) => String(b[k] ?? "").trim();
  const title = text("title");
  if (!title) throw new Error("Job title is required.");
  const responsibilities = Array.isArray(b.responsibilities)
    ? b.responsibilities.map((r) => String(r).trim()).filter(Boolean)
    : [];
  return {
    title,
    department: text("department"),
    location: text("location"),
    type: text("type") || "Full-time",
    experience: text("experience"),
    summary: text("summary"),
    responsibilities,
    status: b.status === "closed" ? "closed" : "open",
  };
}
