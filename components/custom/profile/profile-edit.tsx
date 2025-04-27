import { getSession } from "@/app/actions/auth/session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import { redirect } from "next/navigation";

import { ProfileEditForm } from "./profile-edit-form";

export default async function ProfileEdit({
  params,
}: {
  params: { username: string };
}) {
  const session = await getSession();
  const prisma = new PrismaClient();
  const username = params.username;

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
        <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>
        <ProfileEditForm
          username={username}
          socialLinks={socialLinks}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}
