import SignIn from "@/components/signin";

export const runtime = "edge";
//TODO: Redo page
export default function SignInPage() {
  return (
    <main className="w-full h-[100vh] flex items-center justify-center">
      <SignIn />
    </main>
  );
}
