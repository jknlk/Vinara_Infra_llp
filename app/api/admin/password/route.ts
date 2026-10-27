import { NextResponse } from "next/server";
import { SESSION_COOKIE, changePassword, createSessionToken, isAdmin, sameOrigin, sessionCookieOptions } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { current, next } = await req.json().catch(() => ({}));
  if (typeof current !== "string" || typeof next !== "string") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const result = await changePassword(current, next);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  // other sessions are signed out; this one carries on with a fresh cookie
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(result.version), sessionCookieOptions);
  return res;
}
