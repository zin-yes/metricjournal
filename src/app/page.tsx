import { authService } from "@/server/api/auth/service/auth.service";

import AppPageComponent from "./_components/app-page";

export default async function AppPage() {
  const isAuthenticated = await authService.isAuthenticated();
  const user = await authService.getUser();

  return <AppPageComponent user={user} signIn={!isAuthenticated} />;
}
