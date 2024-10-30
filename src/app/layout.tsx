import "./globals.css";

import { Montserrat } from "next/font/google";
const defaultFont = Montserrat({ subsets: ["latin"] });

import type { Metadata } from "next";
import Providers from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <body className={defaultFont.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
