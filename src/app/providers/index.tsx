import { TRPCReactProvider } from "@/trpc/react";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/toaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        <Toaster />
        <div vaul-drawer-wrapper="" className="bg-background">
          {children}
        </div>
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
