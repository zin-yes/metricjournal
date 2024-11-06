import { type SessionResult } from "@/services/auth/auth.service";

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
