export function parseFields(form: FormData) {
  const title = String(form.get("title") ?? "").trim();
  if (!title) throw new Error("Title is required.");
  const description = String(form.get("description") ?? "").trim();
  const categories = String(form.get("categories") ?? "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
  return { title, description, categories, alt: String(form.get("alt") ?? "").trim() || title };
}
