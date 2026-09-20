import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { insertProject, listProjects } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";
import { parseProjectFields } from "./fields";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listProjects() });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const fields = parseProjectFields(form);
    const file = form.get("file");
    let src: string | null = null;
    let publicId: string | null = null;
    if (file instanceof File && file.size > 0) ({ url: src, publicId } = await uploadImage(file, "vinara/projects"));
    const item = await insertProject({ ...fields, src, publicId });
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not add project" }, { status: 400 });
  }
}
