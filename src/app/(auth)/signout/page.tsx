import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// TODO: Redo auth pages
export default async function SignOutPage() {
  // FIXME: This timeout is added to avoid being redirected too many times too fast, ideally there should be a client-side way to sign out so that the user doesn't have to be redirected.
  // TODO: Would be nice to have a callback/redirect URL specified in the page params.
  await auth.api
    .signOut({
      headers: await headers(),
    })
    .finally(() => {
      setTimeout(() => {
        redirect("/signin");
      }, 1000);
    });

  return <></>;
}
