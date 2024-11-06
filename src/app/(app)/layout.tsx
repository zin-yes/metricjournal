import React from "react";
import Navigation from "./_components/navigation";
import SignInPrompt from "./_components/login-prompt";
import { authService } from "@/services/auth/auth.service";
import { NAVIGATION_MENU_ITMES } from "@/app/(app)/config";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authService.getSession();

  return (
    <>
      <Navigation items={NAVIGATION_MENU_ITMES} session={session} />
      {!session ? <SignInPrompt /> : null}
      <Wrapper>{children}</Wrapper>
    </>
  );
}

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>;
}
