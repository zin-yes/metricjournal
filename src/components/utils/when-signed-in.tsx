import { type SessionResult } from "@/services/auth/auth.service";

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
