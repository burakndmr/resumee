"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

const SignOutButton = () => {
  return (
    <button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              redirect("/login");
            },
          },
        });
      }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
