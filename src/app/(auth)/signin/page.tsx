import SignIn from "@/app/(auth)/signin/signin";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// TODO: Redo auth pages
export default function SignInPage() {
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <Card className="z-50 rounded-md max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignIn />
        </CardContent>
      </Card>
    </main>
  );
}
