import { AuthExample } from "@/components/auth-example";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "./actions/auth/session/action";

export default async function Home() {
  const session = await getSession();

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
