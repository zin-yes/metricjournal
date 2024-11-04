import { type SessionResult } from "@/server/api/auth/service/auth.service.types";

export default function WhenSignedIn({
  session,
  children,
}: {
  session: SessionResult;
  children: React.ReactNode;
}) {
  if (session?.user) return children;

  return null;
}
