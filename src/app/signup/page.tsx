import { SignUp } from "@/components/signup";

export const runtime = "edge";

// TODO: Redo page
export default function SignUpPage() {
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <SignUp />
    </main>
  );
}
