import "./globals.css";

import { Montserrat } from "next/font/google";
const defaultFont = Montserrat({ subsets: ["latin"] });

import type { Metadata } from "next";
import Providers from "@/providers";
import { authService } from "@/services/auth/auth.service";

export const metadata: Metadata = {
  title: "MetricJournal",
  description: "Live intentionally by tracking and reviewing your day.",
};

// TODO: Add translations
export const defaultLanguage = "en";

// TODO: Add session provider, and useSession hook if better-auth isnt adding it by v1
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await authService.getSession();

  return (
    <html lang={defaultLanguage} suppressHydrationWarning>
      <body className={defaultFont.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
