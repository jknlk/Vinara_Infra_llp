import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteProject, getProject, updateProject } from "@/lib/db";
import { destroyImage, uploadImage } from "@/lib/cloudinary";
import { parseProjectFields } from "../fields";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  try {
    const existing = await getProject(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const fields = parseProjectFields(form);
    const file = form.get("file");
    let { src, publicId } = existing;
    if (file instanceof File && file.size > 0) {
      ({ url: src, publicId } = await uploadImage(file, "vinara/projects"));
      if (existing.publicId) await destroyImage(existing.publicId);
    }
    const item = await updateProject(id, { ...fields, src, publicId });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  const existing = await getProject(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.publicId) await destroyImage(existing.publicId);
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
