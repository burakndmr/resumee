import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export const logOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/login");
      },
    },
  });
};
