"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { Instagram, Youtube, Linkedin, Twitter, LinkIcon } from "lucide-react";
import { updateSocialLinks } from "./action";

// URL validation schema
const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .or(z.string().length(0));

const formSchema = z.object({
  instagram: urlSchema,
  youtube: urlSchema,
  linkedin: urlSchema,
  twitter: urlSchema,
  custom: urlSchema,
});

type SocialLinks = {
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  custom: string;
};

export function ProfileEditForm({
  username,
  socialLinks,
  userId,
}: {
  username: string;
  socialLinks: SocialLinks;
  userId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(socialLinks);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instagram: socialLinks.instagram || "",
      youtube: socialLinks.youtube || "",
      linkedin: socialLinks.linkedin || "",
      twitter: socialLinks.twitter || "",
      custom: socialLinks.custom || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Filter out empty values
      const filteredValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          if (value.trim() !== "") {
            acc[key as keyof SocialLinks] = value;
          }
          return acc;
        },
        {} as Partial<SocialLinks>
      );

      // Only proceed if there's at least one link to update
      if (Object.keys(filteredValues).length > 0) {
        await updateSocialLinks(filteredValues, username, userId);
        toast("Profile updated", {
          description:
            "Your social media links have been updated successfully.",
        });
      } else {
        toast("No changes made", {
          description: "You didn't provide any social media links to update.",
        });
      }
    } catch (error) {
      toast("Error", {
        description: "Failed to update your profile. Please try again.",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>
          Update your social media profiles. Only filled fields will be updated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" /> Instagram
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://instagram.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Instagram profile URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Youtube className="h-4 w-4" /> YouTube
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://youtube.com/c/yourchannel"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your YouTube channel URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your LinkedIn profile URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" /> Twitter
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://twitter.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Twitter profile URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="custom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" /> Custom URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourwebsite.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Any other website or portfolio link
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
