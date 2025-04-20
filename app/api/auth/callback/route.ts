import { authClient } from "@/lib/auth-client";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const prisma = new PrismaClient();
  const session = await authClient.getSession();

  console.log("session", session);

  if (session?.data?.user && username) {
    await prisma.user.update({
      where: {
        id: session.data.user.id,
      },
      data: {
        url: username,
      },
    });
  }

  redirect("/");
}
