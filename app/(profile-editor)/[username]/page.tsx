import { getSession } from "@/app/actions/auth/session/action";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { AuthExample } from "@/components/auth-example";

export default async function Profile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getSession();

  const prisma = new PrismaClient();

  if (!session) {
    redirect("/signup");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    redirect("/signup");
  }

  if (user.url !== slug)
    return (
      <div>
        <div>Profile {user.url}</div>

        <AuthExample />
      </div>
    );
}
