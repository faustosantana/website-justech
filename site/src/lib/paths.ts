/** Prefijo de assets cuando el preview vive en GitHub Pages (`/website-justech`). */
export function withBase(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return path;
  return `${base}${path}`;
}
