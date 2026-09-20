const num = (form: FormData, key: string, integer = false) => {
  const v = Number(String(form.get(key) ?? "0").replace(/,/g, "").trim() || 0);
  if (!Number.isFinite(v) || v < 0) throw new Error(`${key} must be a positive number.`);
  return integer ? Math.round(v) : v;
};

export function parseProjectFields(form: FormData) {
  const name = String(form.get("name") ?? "").trim();
  if (!name) throw new Error("Project name is required.");
  const text = (k: string) => String(form.get(k) ?? "").trim();
  return {
    name,
    client: text("client"),
    location: text("location"),
    description: text("description"),
    plotAcres: num(form, "plotAcres"),
    buildingsCount: num(form, "buildingsCount", true),
    builtUpSqft: num(form, "builtUpSqft"),
    completed: num(form, "completed", true),
    wip: num(form, "wip", true),
  };
}
