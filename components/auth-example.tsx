import { getSession } from "@/app/actions/auth/session/action";
import SignOutButton from "./sign-out-button";

export async function AuthExample() {
  const session = await getSession();
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <h1>
        Welcome {session.user.name}
        <br />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <SignOutButton />
      </h1>
    </div>
  );
}
