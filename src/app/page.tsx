import { authService } from "@/server/api/auth/service/auth.service";
import { redirect } from "next/navigation";
import AppPageComponent from "./_components/app-page";

export default async function AppPage() {
  if (!(await authService.isAuthenticated())) {
    return redirect("/signin");
  }

  return <AppPageComponent />;
}
