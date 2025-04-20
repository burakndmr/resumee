"use server";
import { PrismaClient } from "@/prisma/app/generated/prisma";

const prisma = new PrismaClient();

export const checkUniqueUrl = async (url: string) => {
  const user = await prisma.user.findUnique({
    where: {
      url,
    },
  });
  return user;
};
