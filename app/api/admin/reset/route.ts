import { NextResponse } from "next/server";
import { SESSION_COOKIE, resetPassword, sameOrigin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const { token, password } = await req.json().catch(() => ({}));
  if (typeof token !== "string" || typeof password !== "string" || !token) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const result = await resetPassword(token, password);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  // every session is now signed out, this browser included; sign in with the new password
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
