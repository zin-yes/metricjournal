"use client";

import { useSession } from "@/hooks/use-session";

export function useIsAuthenticated() {
  const session = useSession();

  return !!session?.user;
}
