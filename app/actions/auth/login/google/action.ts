import { authClient } from "@/lib/auth-client";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { redirect } from "next/navigation";
import { getSession } from "../../session/action";

export const signInWithGoogle = async (username?: string) => {
  const prisma = new PrismaClient();

  await authClient.signIn.social({
    provider: "google",
  });

  const session = await getSession();

  if (session?.user.id && username) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { url: username },
    });
  }
  redirect("/");
};
