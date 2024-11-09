import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/providers/session-provider";

import React from "react";
import { SessionResult } from "@/services/auth/auth.service";

export default function Providers({
  session,
  children,
}: {
  session: SessionResult;
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        <SessionProvider session={session}>
          <Toaster />
          <div vaul-drawer-wrapper="" className="bg-background">
            {children}
          </div>
        </SessionProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
