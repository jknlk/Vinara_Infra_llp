import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { insertHome } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { HOME_KINDS, type HomeKind } from "@/data/content/homeAdmin";
import { parseHomeForm } from "../fields";

type Ctx = { params: Promise<{ kind: string }> };

export async function POST(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const kind = (await params).kind as HomeKind;
  if (!HOME_KINDS[kind]) return NextResponse.json({ error: "Unknown section" }, { status: 404 });
  try {
    const form = await req.formData();
    const data = parseHomeForm(kind, form);
    let publicId: string | null = null;
    const file = form.get("file");
    if (HOME_KINDS[kind].hasImage && file instanceof File && file.size > 0) {
      ({ url: data.image, publicId } = await uploadImage(file));
    }
    return NextResponse.json({ item: await insertHome(kind, data, publicId) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Save failed" }, { status: 500 });
  }
}
