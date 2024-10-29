import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";
export default async function SignOutPage() {
  const _headers = await headers();

  await auth.api.signOut({
    headers: _headers,
  });

  return redirect("/signin");
}
