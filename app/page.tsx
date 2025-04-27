import { AuthExample } from "@/components/auth-example";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "./actions/auth/session/action";
import { addUrlToUser } from "./actions/auth/login/github/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getSession();
  const cookieStore = await cookies();
  const username = cookieStore.get("username");
  console.log("Cookie’den gelen username:", username);

  if (username) {
    await addUrlToUser(username.value);
  }

  if (session) {
    redirect(`/${session.user.url}`);
  }

  return (
    <div>
      LANDING_PAGE
      {!session ? (
        <Link href="/signup">
          <Button>Create your Page</Button>
        </Link>
      ) : (
        <Link href="/login">
          <Button>Go to your Page</Button>
        </Link>
      )}
      <AuthExample />
    </div>
  );
}
