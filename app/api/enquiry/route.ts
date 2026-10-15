import { NextResponse } from "next/server";

type Fields = Record<string, string>;

const MAX = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function clean(raw: unknown): Fields {
  const out: Fields = {};
  if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      if (typeof v === "string") out[k.slice(0, 40)] = v.trim().slice(0, MAX);
    }
  }
  return out;
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.RESEND_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  if (!key || !to) return NextResponse.json({ error: "Email is not configured." }, { status: 500 });

  const body = (await req.json().catch(() => null)) as { type?: string; fields?: unknown } | null;
  const fields = clean(body?.fields);
  const type = body?.type;
  if (type !== "quote" && type !== "application" && type !== "contact") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!fields.name || !EMAIL_RE.test(fields.email ?? "")) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 400 });
  }

  const subject =
    type === "application"
      ? `Job application — ${fields.role || "General"} — ${fields.name}`
      : type === "quote"
        ? `Quote request — ${fields.company || fields.name}`
        : `Website enquiry — ${fields.name}`;

  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `Vinara Website <${from}>`,
      to: to.split(",").map((s) => s.trim()),
      reply_to: fields.email,
      subject,
      html: `<table style="font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "Could not send. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
