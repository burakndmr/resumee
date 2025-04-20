"use client";
import { signInWithGithub } from "@/app/actions/auth/login/github/action";
import { signInWithGoogle } from "@/app/actions/auth/login/google/action";

export default function Page() {
  return (
    <>
      <div onClick={async () => await signInWithGithub("Github")}>
        <button>Login with Github</button>
      </div>
      <div onClick={signInWithGoogle}>
        <button>Login with Google</button>
      </div>
    </>
  );
}
