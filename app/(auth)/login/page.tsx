"use client";
import { GithubButton } from "@/components/custom/auth/github-button";
import { GoogleButton } from "@/components/custom/auth/google-button";

export default function Page() {
  return (
    <>
      <GithubButton />
      <GoogleButton />
    </>
  );
}
