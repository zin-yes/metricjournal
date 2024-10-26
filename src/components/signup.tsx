"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

// TODO: Add zod validation
export function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="z-50 rounded-md max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {error && <h2 className="text-red-500 text-sm">{error}</h2>}
          <Label htmlFor="display-name">Display name</Label>
          <Input
            id="display-name"
            placeholder="Enter your display name..."
            required
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            value={displayName}
          />
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email..."
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm password</Label>
            <Input
              type="password"
              id="password_confirmation"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
              autoComplete="new-password"
              placeholder="Re-enter your password..."
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="image">Profile Image (optional)</Label>
            <div className="flex items-end gap-4">
              {imagePreview && (
                <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 w-full">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
                {imagePreview && (
                  <X
                    className="cursor-pointer"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  />
                )}
              </div>
            </div>
          </div> */}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await authClient.signUp.email({
                email,
                password,
                name: displayName,
                image: image ? await convertImageToBase64(image) : "",
                callbackURL: "/",
                fetchOptions: {
                  onResponse: () => {
                    setLoading(false);
                  },
                  onRequest: () => {
                    setLoading(true);
                  },
                  onError: (ctx) => {
                    setError(ctx.error.message);
                  },
                },
              });
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>

          <Link href="/signin" className="inline-block text-sm underline">
            Already have an account?
          </Link>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex-1 h-px bg-muted rounded-xl" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-muted rounded-xl" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "discord",
                    callbackURL: "/",
                  },
                  {
                    onError: (ctx) => {
                      setError(ctx.error.message);
                    },
                  }
                );
              }}
            >
              <DiscordLogoIcon />
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={async () => {
                await authClient.signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/",
                  },
                  {
                    onError: (ctx) => {
                      setError(ctx.error.message);
                    },
                  }
                );
              }}
            >
              <FaGoogle />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
