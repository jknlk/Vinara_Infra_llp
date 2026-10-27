import type { PartnerCategory, PartnerInput } from "@/lib/db";
import { uploadImage } from "@/lib/cloudinary";

const CATEGORIES: PartnerCategory[] = ["client", "pmc", "tenant"];

export function parsePartner(form: FormData): PartnerInput {
  const name = String(form.get("name") ?? "").trim();
  if (!name) throw new Error("Name is required.");
  const category = CATEGORIES.find((c) => c === form.get("category"));
  if (!category) throw new Error("Choose a valid group.");
  const showName = form.get("showName") === "on";
  const showLogo = form.get("showLogo") === "on";
  return { category, name, showName, showLogo };
}

// A new file wins over a pasted URL; neither means "no change".
export async function parseLogo(form: FormData): Promise<{ src: string; publicId: string | null } | undefined> {
  const file = form.get("logo");
  if (file instanceof File && file.size > 0) {
    const { url, publicId } = await uploadImage(file, "vinara/partners");
    return { src: url, publicId };
  }
  const url = String(form.get("logoUrl") ?? "").trim();
  if (!url) return undefined;
  if (!/^https:\/\//.test(url)) throw new Error("Logo URL must start with https://");
  return { src: url, publicId: null };
}
