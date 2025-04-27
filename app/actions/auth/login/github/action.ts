import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { getSession } from "../../session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";

export const signInWithGithub = async (username?: string) => {
  const prisma = new PrismaClient();

  await authClient.signIn.social({
    provider: "github",
  });

  const session = await getSession();

  if (session?.user.id && username) {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        url: username,
      },
    });
  }
  if (username) {
    redirect(`/${username}`);
  } else {
    redirect(`/`);
  }
};
