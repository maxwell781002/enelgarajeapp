import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import RouteLoadingLayout from "@repo/ui/layouts/route-loader-layout";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import GoogleAnalytics from "@repo/ui/components/google-analytics";
import { SessionProvider } from "next-auth/react";
import { Analytics } from '@vercel/analytics/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Backoffice del EnElGaraje",
  description: "Backoffice del EnElGaraje",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <RouteLoadingLayout>
            <NextIntlClientProvider messages={messages}>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </NextIntlClientProvider>
          </RouteLoadingLayout>
        </SessionProvider>
        <Analytics />
      </body>
      <GoogleAnalytics />
    </html>
  );
}
