import { authService } from "@/server/api/auth/service/auth.service";
import { redirect } from "next/navigation";
import AppPageComponent from "./_components/app-page";

export default async function AppPage() {
  const session = await authService.getSession();

  if (!session?.session) {
    return redirect("/signin");
  }

  return <AppPageComponent />;
}
