import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { insertGalleryItem, listGallery } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { parseFields } from "./fields";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listGallery() });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const fields = parseFields(form);
    const file = form.get("file");
    const url = String(form.get("url") ?? "").trim();
    let src = url;
    let publicId: string | null = null;
    if (file instanceof File && file.size > 0) {
      ({ url: src, publicId } = await uploadImage(file));
    } else if (!/^https:\/\//.test(url)) {
      return NextResponse.json({ error: "Choose an image file or paste an https image URL." }, { status: 400 });
    }
    const item = await insertGalleryItem({ src, publicId, ...fields });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}
