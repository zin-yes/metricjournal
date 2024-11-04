import { SignUp } from "@/app/(auth)/signup/signup";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// TODO: Redo auth pages
export default function SignUpPage() {
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <Card className="z-50 rounded-md max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUp />
        </CardContent>
      </Card>
    </main>
  );
}
