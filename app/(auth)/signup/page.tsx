"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Check, X } from "lucide-react";

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
import { checkUniqueUrl } from "@/app/actions/auth/check-unique-url/action";
import { GithubButton } from "@/components/custom/auth/github-button";
import Link from "next/link";
import { sanitizeUsernameInput } from "@/lib/utils";
import { GoogleButton } from "@/components/custom/auth/google-button";

export default function UsernameRegistrationPage() {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [showAuthOptions, setShowAuthOptions] = useState(false);

  // Safely silmek için
  const deleteUsernameCookie = () => {
    document.cookie = `username=; max-age=0; path=/`;
  };
  // Safely yazmak için
  const setUsernameCookie = (name: string) => {
    document.cookie = `username=${encodeURIComponent(name)}; path=/`;
  };

  // Sayfa açıldığında cookie'yi temizle
  useEffect(() => {
    deleteUsernameCookie();
  }, []);

  const checkUsernameAvailability = async (name: string) => {
    setIsChecking(true);
    const exists = await checkUniqueUrl(name);
    setIsAvailable(!exists);
    setIsChecking(false);
    return exists;
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // raw input'tan temizlenmiş versiyonu al
    const sanitized = sanitizeUsernameInput(e.target.value);
    setUsername(sanitized);

    // Her yeni inputta önce durumu ve cookie'yi sıfırla
    setIsAvailable(null);
    setShowAuthOptions(false);
    deleteUsernameCookie();
  };

  const handleCheckAvailability = async () => {
    if (!username) {
      toast("Username required", { description: "Lütfen bir username gir." });
      return;
    }
    const exists = await checkUsernameAvailability(username);
    if (exists) {
      // Kullanılamazsa cookie sil
      deleteUsernameCookie();
      toast("Username unavailable", { description: "Başka bir tane dene." });
    } else {
      // Kullanılabilirse cookie kaydet
      setUsernameCookie(username);
      setShowAuthOptions(true);
      toast("Username available!", {
        description: "Kullanılabilir. Kayıt yöntemini seç.",
      });
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Choose Your Username</CardTitle>
          <CardDescription>Pick a unique username</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter username"
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
                      <span className="font-bold">{username}</span> is
                      available!
                    </span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    <span className="text-red-500">
                      <span className="font-bold">{username}</span> is taken.
                    </span>
                  </>
                )}
              </div>
            )}

            {username && (
              <p className="text-sm text-muted-foreground mt-2">
                yourdomain.com/{username}
              </p>
            )}
          </div>

          {showAuthOptions && (
            <div className="space-y-4 pt-4">
              <div className="text-center text-sm font-medium">
                Choose registration method:
              </div>
              <div className="grid gap-3">
                <GithubButton username={username} />
                <GoogleButton username={username} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
