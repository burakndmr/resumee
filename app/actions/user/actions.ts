"use server";

import { PrismaClient } from "@/prisma/app/generated/prisma";
import { getSession } from "../auth/session/action";
import { revalidatePath } from "next/cache";

export type SocialLinkInput = {
  id?: string;
  url: string;
  label?: string;
  name?: string;
  userId: string;
};

export async function upsertSocialLink(
  links: SocialLinkInput | SocialLinkInput[],
  username: string,
  userId: string
) {
  const prisma = new PrismaClient();
  const session = await getSession();
  if (!session?.user?.id || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  // 1) Kullanıcının mevcut linklerini çek
  const existing = await prisma.socialLink.findMany({ where: { userId } });
  // 2) URL --> id Map’i yap
  const existingMap = new Map(existing.map((l) => [l.url, l.id]));

  // 3) Her link için create/update işlerini hazırla
  const ops = (Array.isArray(links) ? links : [links]).map((link) => {
    const url = link.url.trim();
    if (!url) return Promise.resolve(null); // boş URL’leri atla

    const data = {
      url,
      label: link.label?.trim() || "Social",
      name: link.name?.trim() || "Social",
      userId,
    };

    if (existingMap.has(url)) {
      // varsa güncelle
      const id = existingMap.get(url)!;
      return prisma.socialLink.update({
        where: { id },
        data,
      });
    } else {
      // yoksa oluştur
      return prisma.socialLink.create({
        data,
      });
    }
  });

  // 4) Tüm işlemleri paralel çalıştır
  await Promise.all(ops.filter(Boolean));
  revalidatePath(`/${username}`);
}

export async function deleteSocialLink(
  id: string,
  username: string,
  userId: string
) {
  const prisma = new PrismaClient();
  const session = await getSession();
  if (!session?.user?.id || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  await prisma.socialLink.delete({ where: { id } });
  revalidatePath(`/${username}`);
  return { success: true };
}
