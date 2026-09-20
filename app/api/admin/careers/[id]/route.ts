import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteJob, updateJob } from "@/lib/db";
import { parseJob } from "../fields";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  try {
    const item = await updateJob(id, parseJob(await req.json().catch(() => null)));
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteJob(Number((await params).id));
  return NextResponse.json({ ok: true });
}
