import { getSession } from "@/app/actions/auth/session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { redirect } from "next/navigation";
import { ProfileEditForm } from "@/components/custom/profile/profile-edit-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import ProfileInfo from "@/components/custom/profile/profile-info";

export default async function ProfileEdit({
  params,
}: {
  params: { userr: string };
}) {
  const session = await getSession();
  const prisma = new PrismaClient();
  const username = params.userr;

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profileUser = await prisma.user.findUnique({
    where: { id: session.user.id, url: username },
    include: {
      UserDefinedUrl: true,
      UserCustomUrl: true,
    },
  });

  if (!profileUser) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <h1 className="text-2xl font-bold">User not found</h1>
          <p className="text-muted-foreground">
            The user you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  // Organize social media links for easier access
  const socialLinks = {
    instagram:
      profileUser.UserDefinedUrl.find((url) => url.type === "INSTAGRAM")?.url ||
      "",
    youtube:
      profileUser.UserDefinedUrl.find((url) => url.type === "YOUTUBE")?.url ||
      "",
    linkedin:
      profileUser.UserDefinedUrl.find((url) => url.type === "LINKEDIN")?.url ||
      "",
    twitter:
      profileUser.UserDefinedUrl.find((url) => url.type === "TWITTER")?.url ||
      "",
    custom: profileUser.UserCustomUrl[0]?.url || "",
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Your Profile</h1>
          <Link href={`/${username}`}>
            <Button variant="outline" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Manage All Links
            </Button>
          </Link>
        </div>
        <ProfileEditForm
          username={username}
          socialLinks={socialLinks}
          userId={session.user.id}
        />
        <ProfileInfo username={username} userId={session.user.id} />
      </div>
    </div>
  );
}
