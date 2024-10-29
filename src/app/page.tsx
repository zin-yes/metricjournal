import { authService } from "@/server/api/auth/service/auth.service";
import { redirect } from "next/navigation";
import AppPageComponent from "./_components/app-page";
import { headers } from "next/headers";

export default async function AppPage() {
  const _headers = await headers();

  const session = await authService.getSession(_headers);

  if (!session?.session) {
    return redirect("/signin");
  }

  return <AppPageComponent />;
}
