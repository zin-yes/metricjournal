"use client";

import { SessionResult } from "@/services/auth/auth.service";
import { createContext } from "react";

export function SessionProvider({
  session,
  children,
}: {
  session: SessionResult;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export const SessionContext = createContext<SessionResult | undefined>(
  undefined
);
