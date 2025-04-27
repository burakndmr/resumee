import { getSession } from "@/app/actions/auth/session/action";
import { PrismaClient } from "@/prisma/app/generated/prisma";
import Link from "next/link";
import ProfileInfo from "@/components/custom/profile/profile-info";
import OnBoardingForm from "@/components/custom/profile/onboarding-form";

export default async function ProfileEdit({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  const session = await getSession();

  const prisma = new PrismaClient();

  const profileUser = await prisma.user.findUnique({
    where: { url: username },
    include: {
      UserDefinedUrl: true,
      UserCustomUrl: true,
      SocialLink: true,
    },
  });

  console.log("PROFILE USER", profileUser);

  if (!profileUser) {
    return (
      <div className="text-center py-20">
        <h1 className="mb-4 text-2xl">This URL is available!</h1>
        <Link
          href="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Claim now
        </Link>
      </div>
    );
  }

  if (session?.user.id === profileUser.id) {
    const isFirstVisit = profileUser.SocialLink.length === 0;

    if (isFirstVisit) {
      return (
        <div className="container mx-auto py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold">
              Welcome to your profile editor {username}
            </h1>
            <p className="text-muted-foreground">
              You can add your social media links, custom links, and defined
              links here.
            </p>
            <div className="text-muted-foreground">
              ALL DEFINED SOCIAL LINKS
            </div>
            <OnBoardingForm username={username} userId={session?.user.id} />
          </div>
          <ProfileInfo username={username} userId={session?.user.id} />
        </div>
      );
    }

    return (
      <>
        <OnBoardingForm username={username} userId={session?.user.id} />
        <ProfileInfo username={username} userId={session?.user.id} />;
      </>
    );
  }

  return (
    <>
      <div>VIEW_MODE</div>
      {/* <ProfileInfo username={username} userId={session?.user.id} /> */}
    </>
  );

  // Organize social media links for easier access
  // const socialLinks = {
  //   instagram:
  //     profileUser.UserDefinedUrl.find((url) => url.type === "INSTAGRAM")?.url ||
  //     "",
  //   youtube:
  //     profileUser.UserDefinedUrl.find((url) => url.type === "YOUTUBE")?.url ||
  //     "",
  //   linkedin:
  //     profileUser.UserDefinedUrl.find((url) => url.type === "LINKEDIN")?.url ||
  //     "",
  //   twitter:
  //     profileUser.UserDefinedUrl.find((url) => url.type === "TWITTER")?.url ||
  //     "",
  //   custom: profileUser.UserCustomUrl[0]?.url || "",
  // };

  // return (
  //   <div className="container mx-auto py-10">
  //     <div className="max-w-2xl mx-auto">
  //       <div className="flex items-center justify-between mb-6">
  //         <h1 className="text-3xl font-bold">Edit Your Profile</h1>
  //         <Link href={`/${username}`}>
  //           <Button variant="outline" className="flex items-center gap-2">
  //             <List className="h-4 w-4" />
  //             Manage All Links
  //           </Button>
  //         </Link>
  //       </div>
  //       <ProfileEditForm
  //         username={username}
  //         socialLinks={socialLinks}
  //         userId={session.user.id}
  //       />
  //       <ProfileInfo username={username} userId={session.user.id} />
  //     </div>
  //   </div>
  // );
}
