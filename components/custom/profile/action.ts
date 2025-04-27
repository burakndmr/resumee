"use server";
import { getSession } from "@/app/actions/auth/session/action";
import { DefinedUrlType, PrismaClient } from "@/prisma/app/generated/prisma";
import { revalidatePath } from "next/cache";

type SocialLinkUpdate = {
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  custom?: string;
};

export async function updateSocialLinks(
  links: SocialLinkUpdate,
  username: string,
  userId: string
) {
  const prisma = new PrismaClient();
  const session = await getSession();

  if (!session?.user?.id || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  // Process defined URLs (social media)
  const definedUrlUpdates = [];

  if (links.instagram !== undefined) {
    definedUrlUpdates.push(
      updateDefinedUrl(
        prisma,
        userId,
        DefinedUrlType.INSTAGRAM,
        links.instagram,
        "Instagram"
      )
    );
  }

  if (links.youtube !== undefined) {
    definedUrlUpdates.push(
      updateDefinedUrl(
        prisma,
        userId,
        DefinedUrlType.YOUTUBE,
        links.youtube,
        "Youtube"
      )
    );
  }

  if (links.linkedin !== undefined) {
    definedUrlUpdates.push(
      updateDefinedUrl(
        prisma,
        userId,
        DefinedUrlType.LINKEDIN,
        links.linkedin,
        "Linkedin"
      )
    );
  }

  if (links.twitter !== undefined) {
    definedUrlUpdates.push(
      updateDefinedUrl(
        prisma,
        userId,
        DefinedUrlType.TWITTER,
        links.twitter,
        "Twitter"
      )
    );
  }

  // Process custom URL
  if (links.custom !== undefined) {
    await updateCustomUrl(prisma, userId, links.custom);
  }

  // Wait for all updates to complete
  await Promise.all(definedUrlUpdates);

  // Revalidate the path to show updated data
  revalidatePath(`/${username}`);
  revalidatePath(`/${username}/edit`);
}

export async function updateDefinedUrl(
  prisma: PrismaClient,
  userId: string,
  type: DefinedUrlType,
  url: string,
  label: string
) {
  // Check if the URL already exists
  const existingUrl = await prisma.userDefinedUrl.findFirst({
    where: {
      userId,
      type,
    },
  });

  if (existingUrl) {
    // Update existing URL
    await prisma.userDefinedUrl.update({
      where: { id: existingUrl.id },
      data: { url },
    });
  } else if (url.trim() !== "") {
    // Create new URL only if it's not empty
    await prisma.userDefinedUrl.create({
      data: {
        type,
        url,
        userId,
        label,
      },
    });
  }
}

export async function updateCustomUrl(
  prisma: PrismaClient,
  userId: string,
  url: string
) {
  // Check if the custom URL already exists
  const existingUrl = await prisma.userCustomUrl.findFirst({
    where: {
      userId,
    },
  });

  if (existingUrl) {
    // Update existing URL
    await prisma.userCustomUrl.update({
      where: { id: existingUrl.id },
      data: { url },
    });
  } else if (url.trim() !== "") {
    // Create new URL only if it's not empty
    await prisma.userCustomUrl.create({
      data: {
        url,
        userId,
        label: "Custom",
      },
    });
  }
}

// LIST ACTIONS

export async function deleteLink(
  id: string,
  isCustom: boolean,
  username: string,
  userId: string
) {
  const prisma = new PrismaClient();
  const session = await getSession();

  if (!session?.user?.id || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }

  try {
    if (isCustom) {
      // Delete custom URL
      await prisma.userCustomUrl.delete({
        where: { id },
      });
    } else {
      // Delete defined URL (social media)
      await prisma.userDefinedUrl.delete({
        where: { id },
      });
    }

    // Revalidate paths to show updated data
    revalidatePath(`/${username}`);

    return { success: true };
  } catch (error) {
    console.error("Error deleting link:", error);
    throw new Error("Failed to delete link");
  }
}
