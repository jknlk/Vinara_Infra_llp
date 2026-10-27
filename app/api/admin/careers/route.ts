import { NextResponse } from "next/server";
import { withRevalidate } from "@/lib/revalidate";
import { isAdmin } from "@/lib/auth";
import { insertJob, listJobs } from "@/lib/db";
import { parseJob } from "./fields";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ items: await listJobs() });
}

async function postHandler(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const item = await insertJob(parseJob(await req.json().catch(() => null)));
    return NextResponse.json({ item });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Could not add job" }, { status: 400 });
  }
}

export const POST = withRevalidate(postHandler);
