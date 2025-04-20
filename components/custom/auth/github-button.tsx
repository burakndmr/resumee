import { signInWithGithub } from "@/app/actions/auth/login/github/action";
import { Button } from "@/components/ui/button";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

export const GithubButton = ({ username }: { username?: string }) => {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={() => {
        signInWithGithub(username);
      }}
    >
      <GithubLogo size={32} weight="bold" />
      Continue with GitHub
    </Button>
  );
};
