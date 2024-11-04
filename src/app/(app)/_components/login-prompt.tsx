"use client";

import SignIn from "@/app/(auth)/signin/signin";
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";

import { useState } from "react";

export default function SignInPrompt() {
  const [open, setOpen] = useState(true);

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaContent className="pb-3 md:max-w-sm">
        <CredenzaHeader>
          <CredenzaTitle className="text-lg md:text-xl">Sign In</CredenzaTitle>
          <CredenzaDescription className="text-xs md:text-sm">
            Enter your email below to login to your account
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <SignIn />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  );
}
