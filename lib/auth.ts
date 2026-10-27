import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { neon } from "@neondatabase/serverless";

export const SESSION_COOKIE = "vinara_admin";
const MAX_AGE = 60 * 60 * 8;

// Three wrong passwords from one address lock that address out for a while.
export const MAX_FAILURES = 3;
const LOCK_MINUTES = 15;
// Reset links: how long one stays valid, and how many may be mailed per hour.
const RESET_MINUTES = 30;
const RESETS_PER_HOUR = 3;

const scryptAsync = promisify(scrypt) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET is not set");
  return s;
}

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("base64url");
const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/* ------------------------------------------------------------- passwords */

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = await scryptAsync(password, salt, 64);
  return `scrypt$${salt.toString("base64url")}$${hash.toString("base64url")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [scheme, salt, hash] = stored.split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const actual = await scryptAsync(password, Buffer.from(salt, "base64url"), 64);
  return safeEqual(actual.toString("base64url"), hash);
}

// Returns an error message, or null when the password is acceptable.
export function passwordProblem(password: string, username = "") {
  if (password.length < 10) return "Use at least 10 characters.";
  if (password.length > 200) return "Use at most 200 characters.";
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return "Use both letters and numbers.";
  if (username && password.toLowerCase().includes(username.toLowerCase())) return "Don't include the username.";
  return null;
}

/* ---------------------------------------------------------------- schema */

type Account = { username: string; passwordHash: string; sessionVersion: number };

let ready: Promise<void> | null = null;

// The account is seeded once from ADMIN_USERNAME / ADMIN_PASSWORD; after that the
// password lives (hashed) in the database and is changed from the admin panel.
function ensureAuthSchema() {
  ready ??= (async () => {
    const q = sql();
    await q`CREATE TABLE IF NOT EXISTS admin_account (
      id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      username TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      session_version INT NOT NULL DEFAULT 1,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await q`CREATE TABLE IF NOT EXISTS admin_login_attempts (
      key TEXT PRIMARY KEY,
      failures INT NOT NULL DEFAULT 0,
      locked_until TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    await q`CREATE TABLE IF NOT EXISTS admin_reset_tokens (
      token_hash TEXT PRIMARY KEY,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
    const u = process.env.ADMIN_USERNAME;
    const p = process.env.ADMIN_PASSWORD;
    if (u && p) {
      await q`INSERT INTO admin_account (id, username, password_hash) VALUES (1, ${u}, ${await hashPassword(p)})
        ON CONFLICT (id) DO NOTHING`;
    }
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

async function getAccount(): Promise<Account | null> {
  await ensureAuthSchema();
  const [row] = await sql()`SELECT username, password_hash, session_version FROM admin_account WHERE id = 1`;
  return row ? { username: row.username, passwordHash: row.password_hash, sessionVersion: row.session_version } : null;
}

/* ------------------------------------------------------- login lockout */

export function clientKey(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  return `ip:${ip}`;
}

// Seconds until the address may try again, or 0 when it isn't locked.
export async function lockedFor(key: string) {
  await ensureAuthSchema();
  const [row] = await sql()`SELECT EXTRACT(EPOCH FROM (locked_until - now()))::int AS left
    FROM admin_login_attempts WHERE key = ${key} AND locked_until > now()`;
  return row ? Math.max(1, Number(row.left)) : 0;
}

// Records a failure; returns how many attempts remain (0 means now locked).
export async function recordFailure(key: string) {
  // a lock that has run out starts the count afresh
  const [row] = await sql()`INSERT INTO admin_login_attempts (key, failures) VALUES (${key}, 1)
    ON CONFLICT (key) DO UPDATE SET
      failures = CASE WHEN admin_login_attempts.locked_until IS NOT NULL AND admin_login_attempts.locked_until <= now()
                      THEN 1 ELSE admin_login_attempts.failures + 1 END,
      locked_until = NULL,
      updated_at = now()
    RETURNING failures`;
  const failures = Number(row.failures);
  if (failures >= MAX_FAILURES) {
    await sql()`UPDATE admin_login_attempts SET locked_until = now() + make_interval(mins => ${LOCK_MINUTES}) WHERE key = ${key}`;
    return 0;
  }
  return MAX_FAILURES - failures;
}

export async function clearFailures(key?: string) {
  if (key) await sql()`DELETE FROM admin_login_attempts WHERE key = ${key}`;
  else await sql()`DELETE FROM admin_login_attempts WHERE key LIKE 'ip:%'`;
}

/* -------------------------------------------------------------- sessions */

export async function checkCredentials(username: string, password: string) {
  const account = await getAccount();
  if (!account) return null;
  // Check both so timing doesn't reveal which one was wrong.
  const okUser = safeEqual(username, account.username);
  const okPass = await verifyPassword(password, account.passwordHash);
  return okUser && okPass ? account : null;
}

export function createSessionToken(sessionVersion: number) {
  const payload = `${Date.now() + MAX_AGE * 1000}.${sessionVersion}`;
  return `${payload}.${sign(payload)}`;
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE,
};

export async function isAdmin() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const [exp, version, sig] = token.split(".");
  if (!exp || !version || !sig || !safeEqual(sig, sign(`${exp}.${version}`))) return false;
  if (Number(exp) <= Date.now()) return false;
  // a password change bumps the version, which signs out every older session
  const account = await getAccount();
  return Boolean(account) && Number(version) === account!.sessionVersion;
}

/* -------------------------------------------------------- password change */

// Sets a new password and signs out all sessions; returns the new session version.
async function setPassword(password: string) {
  const hash = await hashPassword(password);
  const [row] = await sql()`UPDATE admin_account
    SET password_hash = ${hash}, session_version = session_version + 1, updated_at = now()
    WHERE id = 1 RETURNING session_version`;
  await sql()`DELETE FROM admin_reset_tokens`;
  await clearFailures();
  return Number(row.session_version);
}

export async function changePassword(current: string, next: string) {
  const account = await getAccount();
  if (!account || !(await verifyPassword(current, account.passwordHash))) {
    return { error: "Current password is incorrect." } as const;
  }
  const problem = passwordProblem(next, account.username);
  if (problem) return { error: problem } as const;
  if (await verifyPassword(next, account.passwordHash)) return { error: "Choose a password you haven't used here." } as const;
  return { version: await setPassword(next) } as const;
}

/* ---------------------------------------------------------- password reset */

// Creates a single-use reset token for `username`, or null when it doesn't
// match or too many links were sent this hour. The raw token is only ever mailed.
export async function createResetToken(username: string) {
  const account = await getAccount();
  if (!account || !safeEqual(username, account.username)) return null;
  const [{ n }] = await sql()`SELECT count(*)::int AS n FROM admin_reset_tokens WHERE created_at > now() - interval '1 hour'`;
  if (Number(n) >= RESETS_PER_HOUR) return null;
  const token = randomBytes(32).toString("base64url");
  await sql()`DELETE FROM admin_reset_tokens WHERE expires_at < now() - interval '1 day'`;
  await sql()`INSERT INTO admin_reset_tokens (token_hash, expires_at)
    VALUES (${sha256(token)}, now() + make_interval(mins => ${RESET_MINUTES}))`;
  return { token, minutes: RESET_MINUTES };
}

export async function resetPassword(token: string, password: string) {
  const account = await getAccount();
  if (!account) return { error: "Reset is not available." } as const;
  // a rejected password leaves the link usable for another go
  const problem = passwordProblem(password, account.username);
  if (problem) return { error: problem } as const;
  // consumed atomically, so a link can't be used twice
  const [row] = await sql()`DELETE FROM admin_reset_tokens WHERE token_hash = ${sha256(token)} AND expires_at > now() RETURNING token_hash`;
  if (!row) return { error: "This reset link is invalid or has expired. Request a new one." } as const;
  return { version: await setPassword(password) } as const;
}

// Rejects cross-site form posts to the auth endpoints.
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") ?? req.headers.get("host"));
  } catch {
    return false;
  }
}
