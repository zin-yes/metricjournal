import { authService } from "@/server/api/auth/service/auth.service";
import Projects from "./_components/projects";

export default async function ProjectsPage() {
  // const session = await authService.getSession();

  return <Projects />;
}
