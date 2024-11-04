import { authService } from "@/server/api/auth/service/auth.service";
import React from "react";
import Navigation from "./_components/navigation";
import SignInPrompt from "./_components/login-prompt";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authService.getSession();

  return (
    <>
      <Navigation session={session} />
      {!session ? <SignInPrompt /> : null}
      <Wrapper>{children}</Wrapper>
    </>
  );
}

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-4">{children}</div>;
}
