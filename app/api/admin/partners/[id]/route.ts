import { NextResponse } from "next/server";
import { withRevalidate } from "@/lib/revalidate";
import { isAdmin } from "@/lib/auth";
import { deletePartner, getPartner, updatePartner } from "@/lib/db";
import { destroyImage } from "@/lib/cloudinary";
import { parseLogo, parsePartner } from "../fields";

type Ctx = { params: Promise<{ id: string }> };

async function patchHandler(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  try {
    const before = await getPartner(id);
    if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const form = await req.formData();
    const input = parsePartner(form);
    const logo = form.get("removeLogo") === "on" ? null : await parseLogo(form);
    const item = await updatePartner(id, input, logo);
    // the old upload is no longer referenced once it is replaced or removed
    if (logo !== undefined && before.logoPublicId) await destroyImage(before.logoPublicId).catch(() => {});
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Update failed" }, { status: 400 });
  }
}

async function deleteHandler(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = Number((await params).id);
  const before = await getPartner(id);
  await deletePartner(id);
  if (before?.logoPublicId) await destroyImage(before.logoPublicId).catch(() => {});
  return NextResponse.json({ ok: true });
}

export const PATCH = withRevalidate(patchHandler);

export const DELETE = withRevalidate(deleteHandler);
