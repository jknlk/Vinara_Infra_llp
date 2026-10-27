import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  checkCredentials,
  clearFailures,
  clientKey,
  createSessionToken,
  lockedFor,
  recordFailure,
  sameOrigin,
  sessionCookieOptions,
} from "@/lib/auth";

const lockedMessage = (seconds: number) =>
  `Too many failed attempts. Try again in ${Math.ceil(seconds / 60)} minute${seconds > 60 ? "s" : ""}, or reset your password.`;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const key = clientKey(req);

  const wait = await lockedFor(key);
  if (wait) return NextResponse.json({ error: lockedMessage(wait), locked: true }, { status: 429 });

  const { username, password } = await req.json().catch(() => ({}));
  const account =
    typeof username === "string" && typeof password === "string" && username.length <= 200 && password.length <= 200
      ? await checkCredentials(username, password)
      : null;

  if (!account) {
    const left = await recordFailure(key);
    if (!left) return NextResponse.json({ error: lockedMessage(15 * 60), locked: true }, { status: 429 });
    return NextResponse.json(
      { error: `Invalid username or password. ${left} attempt${left === 1 ? "" : "s"} left before a 15-minute lock.` },
      { status: 401 }
    );
  }

  await clearFailures(key);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, createSessionToken(account.sessionVersion), sessionCookieOptions);
  return res;
}
