import "@repo/ui/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import RouteLoadingLayout from "@repo/ui/layouts/route-loader-layout";
import GoogleAnalytics from "@repo/ui/google-analytics";

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
        <RouteLoadingLayout>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </RouteLoadingLayout>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
