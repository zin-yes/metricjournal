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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Key, Loader2, TwitchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FaDiscord, FaGoogle } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card className="z-50 rounded-md max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {error && <h2 className="text-red-500 text-sm">{error}</h2>}
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link
                href="/forget-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
              </Link> */}
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label>Remember me</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
            onClick={async () => {
              await authClient.signIn.email(
                {
                  email: email,
                  password: password,
                  callbackURL: "/",
                  dontRememberMe: !rememberMe,
                },
                {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    setError(ctx.error.message);
                  },
                }
              );
            }}
          >
            {loading ? <Loader2 size={17} className="animate-spin" /> : "Login"}
          </Button>
          <Link href="/signup" className="inline-block text-sm underline">
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
                  },
                  {
                    onError: (ctx) => {
                      setError(ctx.error.message);
                    },
                  }
                );
              }}
            >
              <FaDiscord size={17} />
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
              <FaGoogle size={17} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
