import { createHash } from "node:crypto";

const FOLDER = "vinara/gallery";

function creds() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !key || !secret) throw new Error("Cloudinary env vars are not set");
  return { cloud, key, secret };
}

function signature(params: Record<string, string>, secret: string) {
  const base = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return createHash("sha1").update(base + secret).digest("hex");
}

export async function uploadImage(file: File, folder = FOLDER): Promise<{ url: string; publicId: string }> {
  const { cloud, key, secret } = creds();
  const timestamp = String(Math.floor(Date.now() / 1000));
  const params = { folder, timestamp };
  const body = new FormData();
  body.set("file", file);
  body.set("api_key", key);
  body.set("timestamp", timestamp);
  body.set("folder", folder);
  body.set("signature", signature(params, secret));
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? "Cloudinary upload failed");
  return { url: data.secure_url, publicId: data.public_id };
}

export async function destroyImage(publicId: string) {
  const { cloud, key, secret } = creds();
  const timestamp = String(Math.floor(Date.now() / 1000));
  const params = { public_id: publicId, timestamp };
  const body = new URLSearchParams({ ...params, api_key: key, signature: signature(params, secret) });
  await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/destroy`, { method: "POST", body });
}
