"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";
import {
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  LinkIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { deleteSocialLink, SocialLinkInput } from "@/app/actions/user/actions";

export function LinksList({
  links,
  username,
  userId,
}: {
  links: SocialLinkInput[] | SocialLinkInput[];
  username: string;
  userId?: string;
}) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "INSTAGRAM":
        return <Instagram className="h-4 w-4" />;
      case "YOUTUBE":
        return <Youtube className="h-4 w-4" />;
      case "LINKEDIN":
        return <Linkedin className="h-4 w-4" />;
      case "TWITTER":
        return <Twitter className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteSocialLink(id, username, userId as string);
      toast.success("Link deleted", {
        description: "The link has been successfully removed.",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to delete the link. Please try again.",
      });
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (links.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>You havent added any links yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              Add social media links to your profile
            </p>
            <Link href={`/${username}/edit`}>
              <Button>Add Links</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPublic = true;

  if (isPublic) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Public Links</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {typeof links[0] === "object" && "id" in links[0]
                ? links.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIcon(link.name || "")}
                          <span>{link.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.url}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                : links.map((link) => (
                    <TableRow key={link.url}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIcon(link.name || "")}
                          <span>{link.label}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.url}
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Links</CardTitle>
        <CardDescription>
          Manage all your social media and custom links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getIcon(link.name || "")}
                    <span>{link.label}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate block max-w-[300px]"
                  >
                    {link.url}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/${username}/edit`}>
                      <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </Link>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this link from your
                            profile.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(link.id as string)}
                            disabled={isDeleting === link.id}
                          >
                            {isDeleting === link.id ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
