import { authClient } from "@/lib/auth-client";

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  console.log(data);
};
