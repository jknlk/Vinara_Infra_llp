import { revalidatePath } from "next/cache";

// Public pages are cached; a successful admin change purges them so edits show at once.
export function withRevalidate<A extends unknown[]>(handler: (...args: A) => Promise<Response>) {
  return async (...args: A) => {
    const res = await handler(...args);
    if (res.ok) revalidatePath("/", "layout");
    return res;
  };
}
