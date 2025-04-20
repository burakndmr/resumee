import { redirect } from "next/navigation";
import { getSession } from "../../session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";

const prisma = new PrismaClient();

export const addUrlToUser = async (username: string) => {
  const session = await getSession();
  if (session?.user.url) {
    redirect(`/${session.user.url}`);
  }
  if (session && username) {
    await prisma.user
      .update({
        where: { id: session.user.id },
        data: { url: username },
      })
      .then(() => {
        redirect(`/`);
      });
  }
};
