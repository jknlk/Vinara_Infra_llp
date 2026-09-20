import { listHome } from "@/lib/db";
import { homeSeed, type HomeData, type HomeKind } from "@/data/content/homeAdmin";

// Home-page blocks are admin-editable; fall back to the bundled defaults if the database is unreachable.
export async function loadHome(kind: HomeKind): Promise<HomeData[]> {
  try {
    return (await listHome(kind)).map((r) => r.data);
  } catch {
    return homeSeed()[kind];
  }
}
