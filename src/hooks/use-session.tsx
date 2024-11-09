import { SessionContext } from "@/providers/session-provider";
import { useContext } from "react";

import { type SessionResult } from "@/services/auth/auth.service";

export function useSession(): SessionResult {
  const session = useContext(SessionContext);

  // TODO: Add check for whether or not the hook is being used inside a SessionProvider.

  return session;
}
