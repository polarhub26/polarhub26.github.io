// [GUIDE: IMAGES] Sheet rows may use a direct HTTPS image URL or a filename
// such as assets/catalogue-repair.webp from the public/assets folder.
export function resolveImageUrl(value?: string): string | null {
  const source = value?.trim();
  if (!source) return null;
  if (/^https:\/\/[^\s]+$/i.test(source)) return source;
  if (/^assets\/[a-z0-9][a-z0-9._/-]*$/i.test(source) && !source.includes("..")) {
    return `${import.meta.env.BASE_URL}${source}`;
  }
  return null;
}
