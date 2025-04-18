import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignOutButton from "./sign-out-button";

export async function AuthExample() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <h1>
        Welcome {session.user.name}
        <SignOutButton />
      </h1>
    </div>
  );
}
