import { TURKISH_MAP } from "@/constants/objects";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeUsernameInput(input: string) {
  // 1) Küçük harfe çevir
  let s = input.toLowerCase();

  // 2) Türkçe karakterleri değiştir
  s = s.replace(/[ÇçĞğÖöÜüŞşİı]/g, (c) => TURKISH_MAP[c] || "");

  // 3) Nokta ve diğer izin verilmeyen karakterleri temizle
  //    (yalnızca a-z, 0-9 ve '-' kalacak)
  s = s.replace(/[^a-z0-9\s-]/g, "");

  // 4) Boşlukları '-' ile değiştir
  s = s.replace(/\s+/g, "-");

  // 5) İki veya daha fazla '-' yan yana gelmesin
  s = s.replace(/-+/g, "-");

  // 6) En başta veya sonda '-' olmasın
  s = s.replace(/^-+|-+$/g, "");

  return s;
}
