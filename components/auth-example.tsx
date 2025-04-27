import { getSession } from "@/app/actions/auth/session/action";
import SignOutButton from "./sign-out-button";
import { PrismaClient } from "@/prisma/app/generated/prisma";

export async function AuthExample() {
  const prisma = new PrismaClient();

  const session = await getSession();
  if (!session) {
    return <div>Not authenticated</div>;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  const userDefinedUrls = await prisma.userDefinedUrl.findMany({
    where: { userId: session.user.id },
  });

  const userCustomUrls = await prisma.userCustomUrl.findMany({
    where: { userId: session.user.id },
  });

  return (
    <div>
      <h1>
        Welcome {session.user.name}
        <br />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <br />
        <br />
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <br />
        <pre>{JSON.stringify(userDefinedUrls, null, 2)}</pre>
        <br />
        <pre>{JSON.stringify(userCustomUrls, null, 2)}</pre>
        <br />
        <SignOutButton />
      </h1>
    </div>
  );
}
