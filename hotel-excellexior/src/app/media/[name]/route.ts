import { readFile } from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR, UPLOAD_NAME_PATTERN } from "@/lib/photos";

const CONTENT_TYPES = { jpg: "image/jpeg", png: "image/png", webp: "image/webp" } as const;

// Serves photos uploaded from /admin/photos. File names are random UUIDs, so
// a given URL never changes content and can be cached indefinitely.
export async function GET(_request: Request, ctx: RouteContext<"/media/[name]">) {
  const { name } = await ctx.params;
  if (!UPLOAD_NAME_PATTERN.test(name)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(path.join(UPLOAD_DIR, name));
    const ext = name.split(".").pop() as keyof typeof CONTENT_TYPES;
    return new Response(file, {
      headers: {
        "Content-Type": CONTENT_TYPES[ext],
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
