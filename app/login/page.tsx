"use client";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Page() {
  return (
    <div
      onClick={async () => {
        await authClient.signIn
          .social({
            provider: "github",
          })
          .then((res) => {
            console.log(res);
            redirect("/");
          });
      }}
    >
      Login with Github
    </div>
  );
}
