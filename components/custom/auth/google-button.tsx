import { signInWithGoogle } from "@/app/actions/auth/login/google/action";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

export const GoogleButton = ({ username }: { username?: string }) => {
  return (
    <Button
      variant="outline"
      className="flex items-center justify-center gap-2"
      onClick={() => {
        signInWithGoogle(username);
      }}
    >
      <GoogleLogo size={32} weight="bold" />
      Continue with Google
    </Button>
  );
};
