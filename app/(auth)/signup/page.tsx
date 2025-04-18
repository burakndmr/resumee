"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github, Loader2, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function UsernameRegistrationPage() {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  const router = useRouter();

  // This would be replaced with a real API call to check username availability
  const checkUsernameAvailability = async (username: string) => {
    setIsChecking(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, usernames containing "admin" or "test" are unavailable
    const available =
      !username.toLowerCase().includes("admin") &&
      !username.toLowerCase().includes("test") &&
      username.length >= 3;

    setIsAvailable(available);
    setIsChecking(false);
    return available;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setUsername(value);

    // Reset states when username changes
    if (isAvailable) {
      setIsAvailable(null);
      setShowAuthOptions(false);
    }
  };

  const handleCheckAvailability = async () => {
    if (!username) {
      toast("Username required", {
        description: "Please enter a username to check availability",
      });
      return;
    }

    const available = await checkUsernameAvailability(username);

    if (available) {
      setShowAuthOptions(true);
      toast("Username available!", {
        description:
          "This username is available. Choose your registration method.",
      });
    } else {
      toast("Username unavailable", {
        description: "Please try a different username",
      });
    }
  };

  const handleAuthProvider = (provider: string) => {
    // In a real app, this would redirect to the OAuth flow
    toast("Redirecting to authentication", {
      description: `You'll be redirected to sign in with ${provider}`,
    });

    // Simulate redirect
    setTimeout(() => {
      router.push(
        `/auth/${provider.toLowerCase()}?username=${encodeURIComponent(
          username
        )}`
      );
    }, 1500);
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Choose Your Username</CardTitle>
          <CardDescription>
            Pick a unique username for your profile URL
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter your desired username"
                value={username}
                onChange={handleUsernameChange}
                className="flex-1"
              />
              <Button
                onClick={handleCheckAvailability}
                disabled={isChecking || !username}
                variant="outline"
              >
                {isChecking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Check"
                )}
              </Button>
            </div>

            {username && isAvailable !== null && (
              <div className="flex items-center text-sm mt-2">
                {isAvailable ? (
                  <>
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-green-500">
                      Username is available!
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-red-500">
                      Username is not available
                    </span>
                  </>
                )}
              </div>
            )}

            {username && (
              <p className="text-sm text-muted-foreground mt-2">
                Your profile will be available at:{" "}
                <span className="font-medium">yourdomain.com/{username}</span>
              </p>
            )}
          </div>

          {showAuthOptions && (
            <div className="space-y-4 pt-4">
              <div className="text-center text-sm font-medium">
                Username is available! Choose how to register:
              </div>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => handleAuthProvider("GitHub")}
                >
                  <Github className="h-4 w-4" />
                  Continue with GitHub
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => handleAuthProvider("Google")}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="font-medium underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
