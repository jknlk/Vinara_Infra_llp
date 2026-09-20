import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteHome, getHome, updateHome } from "@/lib/db";
import { destroyImage, uploadImage } from "@/lib/cloudinary";
import { HOME_KINDS } from "@/data/content/homeAdmin";
import { parseHomeForm } from "../../fields";

type Ctx = { params: Promise<{ kind: string; id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const existing = await getHome(Number(id));
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const data = parseHomeForm(existing.kind, form);
    let publicId = existing.publicId;
    if (HOME_KINDS[existing.kind].hasImage) {
      const file = form.get("file");
      if (file instanceof File && file.size > 0) {
        ({ url: data.image, publicId } = await uploadImage(file));
        if (existing.publicId) await destroyImage(existing.publicId);
      } else if (!data.image) {
        data.image = existing.data.image ?? "";
      }
    }
    return NextResponse.json({ item: await updateHome(existing.id, data, publicId) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const existing = await getHome(Number((await params).id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (existing.publicId) await destroyImage(existing.publicId);
  await deleteHome(existing.id);
  return NextResponse.json({ ok: true });
}
