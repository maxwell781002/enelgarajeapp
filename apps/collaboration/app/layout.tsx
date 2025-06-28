import "@repo/ui/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import RouteLoadingLayout from "@repo/ui/layouts/route-loader-layout";
import GoogleAnalytics from "@repo/ui/components/google-analytics";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Gestores, el EnElGaraje",
  description: "Plataforma gestores, el EnElGaraje",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <RouteLoadingLayout>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </RouteLoadingLayout>
        </SessionProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
