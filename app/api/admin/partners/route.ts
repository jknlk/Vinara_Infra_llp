import { NextResponse } from "next/server";
import { withRevalidate } from "@/lib/revalidate";
import { isAdmin } from "@/lib/auth";
import { insertPartner, listPartners } from "@/lib/db";
import { parseLogo, parsePartner } from "./fields";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listPartners() });
}

async function postHandler(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const form = await req.formData();
    const input = parsePartner(form);
    const logo = await parseLogo(form);
    return NextResponse.json({ item: await insertPartner(input, logo ?? null) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not add entry" }, { status: 400 });
  }
}

export const POST = withRevalidate(postHandler);
