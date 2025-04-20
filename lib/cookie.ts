// utils/cookie.ts
export function getCookie(name: string): string | null {
  const pairs = document.cookie.split("; ").map((c) => c.split("="));
  const found = pairs.find(([key]) => key === name);
  return found ? decodeURIComponent(found[1]) : null;
}
