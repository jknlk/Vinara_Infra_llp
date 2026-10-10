import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getBuildingPhoto, updateBuildingPhoto } from "@/lib/db";
import { destroyImage, uploadImage } from "@/lib/cloudinary";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  try {
    const existing = await getBuildingPhoto(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const caption = String(form.get("caption") ?? "").trim();
    const file = form.get("file");
    let { src, publicId } = existing;
    if (file instanceof File && file.size > 0) {
      ({ url: src, publicId } = await uploadImage(file, "vinara/buildings"));
      if (existing.publicId) await destroyImage(existing.publicId);
    }
    const item = await updateBuildingPhoto(id, { src, publicId, caption });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 400 });
  }
}
