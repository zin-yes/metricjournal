import "./globals.css";

export const runtime = "edge";

import { Montserrat } from "next/font/google";
const defaultFont = Montserrat({ subsets: ["latin"] });

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
export const metadata: Metadata = {
  title: "MetricJournal",
  description: "Live intentionally by tracking and reviewing your day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
