import { type SessionResult } from "@/server/api/auth/service/auth.service.types";

export default function WhenSignedOut({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionResult;
}) {
  if (session?.user) return null;

  return children;
}
