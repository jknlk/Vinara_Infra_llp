import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { insertPartner, listPartners } from "@/lib/db";
import { parsePartner } from "./fields";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listPartners() });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { category, name } = parsePartner(await req.json().catch(() => null));
    return NextResponse.json({ item: await insertPartner(category, name) });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not add entry" }, { status: 400 });
  }
}
