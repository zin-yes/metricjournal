import { authService } from "@/server/api/auth/service/auth.service";
import AppPageComponent from "./_components/app-page";

export default async function AppPage() {
  return <AppPageComponent signIn={!(await authService.isAuthenticated())} />;
}
