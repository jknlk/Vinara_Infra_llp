import { NextResponse } from "next/server";
import { withRevalidate } from "@/lib/revalidate";
import { isAdmin } from "@/lib/auth";
import { deleteGalleryItem, getGalleryItem, updateGalleryItem } from "@/lib/db";
import { destroyImage, uploadImage } from "@/lib/cloudinary";
import { parseFields } from "../fields";

type Ctx = { params: Promise<{ id: string }> };

async function patchHandler(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  try {
    const existing = await getGalleryItem(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const fields = parseFields(form);
    const file = form.get("file");
    let { src, publicId } = existing;
    if (file instanceof File && file.size > 0) {
      ({ url: src, publicId } = await uploadImage(file));
      if (existing.publicId) await destroyImage(existing.publicId);
    }
    const item = await updateGalleryItem(id, { src, publicId, ...fields });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 500 });
  }
}

async function deleteHandler(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  const existing = await getGalleryItem(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.publicId) await destroyImage(existing.publicId);
  await deleteGalleryItem(id);
  return NextResponse.json({ ok: true });
}

export const PATCH = withRevalidate(patchHandler);

export const DELETE = withRevalidate(deleteHandler);
