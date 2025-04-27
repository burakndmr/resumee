"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { upsertSocialLink } from "@/app/actions/user/actions";
import { toast } from "sonner";

const urlSchema = z
  .string()
  .url("Lütfen geçerli bir URL girin")
  .or(z.string().length(0));

const socialInputLinks = [
  { id: "1", name: "instagram", label: "Instagram" },
  { id: "2", name: "youtube", label: "Youtube" },
  { id: "3", name: "linkedin", label: "Linkedin" },
  { id: "4", name: "twitter", label: "Twitter" },
];

// Form schema with unique URL validation
const formSchema = z.object({
  links: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        label: z.string(),
        url: urlSchema,
      })
    )
    .superRefine((links, ctx) => {
      // Collect non-empty URLs
      const urls = links.map((l) => l.url.trim()).filter((u) => u !== "");
      // Find duplicates
      const seen = new Set<string>();
      const duplicates = new Set<string>();
      urls.forEach((url) => {
        if (seen.has(url)) duplicates.add(url);
        else seen.add(url);
      });
      // Add issue for each duplicate field
      if (duplicates.size > 0) {
        links.forEach((l, index) => {
          if (duplicates.has(l.url.trim())) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Aynı URL birden fazla kez girilemez.",
              path: ["links", index, "url"],
            });
          }
        });
      }
    }),
});
type FormValues = z.infer<typeof formSchema>;

export default function OnBoardingForm({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      links: socialInputLinks.map((link) => ({
        id: link.id,
        name: link.name,
        label: link.label,
        url: "",
      })),
    },
  });

  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  // Listen to all link values
  const linkValues = watch("links");

  // Prevent adding new custom link if an existing custom link is empty
  const hasEmptyCustom = linkValues.some(
    (l) => l.name === "custom" && l.url.trim() === ""
  );

  async function onSubmit(values: FormValues) {
    const filtered = values.links.filter((l) => l.url.trim() !== "");

    try {
      setIsSubmitting(true);
      if (filtered.length > 0) {
        await upsertSocialLink(
          filtered.map((link) => ({ ...link, userId })),
          username,
          userId
        );
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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((item, index) => (
            <FormField
              key={item.id}
              control={control}
              name={`links.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    {item.label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`https://www.${item.name}.com`}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{item.label}</FormDescription>
                  <FormMessage />
                  {item.name === "custom" && (
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button
            type="button"
            onClick={() =>
              append({
                id: String(Date.now()),
                name: "custom",
                label: "Custom Link",
                url: "",
              })
            }
            disabled={hasEmptyCustom}
          >
            Add Social Link
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
