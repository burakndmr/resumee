import { getSession } from "@/app/actions/auth/session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { redirect } from "next/navigation";
import { LinksList } from "./links-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfileInfo({
  username,
  userId,
}: {
  username: string;
  userId?: string;
}) {
  const session = await getSession();
  const prisma = new PrismaClient();

  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch user with all their links

  const profileUser = await prisma.user.findUnique({
    where: { id: session.user.id, url: username },
    include: {
      SocialLink: true,
    },
  });

  const publicUser = await prisma.user.findUnique({
    where: { url: username },
    include: {
      SocialLink: true,
    },
  });

  const allPublicLinks = publicUser
    ? [
        ...publicUser.SocialLink.map((link) => ({
          id: link.id,
          name: link.name,
          label: link.label,
          url: link.url,
        })),
      ]
    : [];

  if (!profileUser) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Link href={`/${username}/edit`}>
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Manage Your Links</h1>
            </div>
            <Link href={`/${username}/edit`}>
              <Button>Add New Links</Button>
            </Link>
          </div>

          <LinksList links={publicUser?.SocialLink || []} username={username} />
        </div>
      </div>
    );
  }

  // Combine all links for display

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href={`/${username}/edit`}>
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Manage Your Links</h1>
          </div>
          <Link href={`/${username}/edit`}>
            <Button>Add New Links</Button>
          </Link>
        </div>

        <LinksList
          links={profileUser.SocialLink}
          username={username}
          userId={userId}
        />
      </div>
    </div>
  );
}
