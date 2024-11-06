import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// TODO: Redo auth pages
export default async function SignOutPage() {
  // FIXME: This timeout is added to avoid being redirected too many times too fast, ideally there should be a client-side way to sign out so that the user doesn't have to be redirected.
  // TODO: Would be nice to have a callback/redirect URL specified in the page params.
  await auth.api.signOut({
    headers: await headers(),
  });

  await sleep(500);

  redirect("/signin");

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      Redirecting...
    </div>
  );
}
