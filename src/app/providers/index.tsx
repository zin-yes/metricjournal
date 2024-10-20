import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        <div vaul-drawer-wrapper="" className="bg-background">
          {children}
        </div>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
