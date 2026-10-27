import { NextResponse } from "next/server";
import { createResetToken, sameOrigin } from "@/lib/auth";

// Always answers the same way, so it can't be used to discover the username.
const DONE = { ok: true, message: "If that username is correct, a reset link has been sent to the admin email." };

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Invalid request." }, { status: 403 });
  const { username } = await req.json().catch(() => ({}));
  if (typeof username !== "string" || !username || username.length > 200) return NextResponse.json(DONE);

  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const to = process.env.ADMIN_EMAIL || process.env.RESEND_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "Password reset email is not configured." }, { status: 500 });

  const reset = await createResetToken(username);
  if (!reset) return NextResponse.json(DONE);

  const base = process.env.SITE_URL?.replace(/\/$/, "") || new URL(req.url).origin;
  const link = `${base}/admin/reset?token=${encodeURIComponent(reset.token)}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Vinara Website <${from}>`,
      to: to.split(",").map((s) => s.trim()),
      subject: "Reset your Vinara admin password",
      html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5">
        <p>A password reset was requested for the Vinara Infra admin panel.</p>
        <p><a href="${link}" style="display:inline-block;background:#0f2b57;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none">Set a new password</a></p>
        <p style="color:#666">The link works once and expires in ${reset.minutes} minutes. If you didn't ask for this, ignore this email — your password stays the same.</p>
      </div>`,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text().catch(() => ""));
  return NextResponse.json(DONE);
}
