import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const signInWithGithub = async () => {
  await authClient.signIn
    .social({
      provider: "github",
    })
    .then((res) => {
      console.log(res);
      redirect("/");
    });
};
