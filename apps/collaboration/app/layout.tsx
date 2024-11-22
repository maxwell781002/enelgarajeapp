import { Toaster } from "@repo/ui/components/ui/toaster";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import "@repo/ui/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { LayoutMain } from "@repo/ui/layouts/backoffice/main";
import { auth } from "@repo/model/lib/auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Backoffice de el EnElGaraje",
  description: "Backoffice de el EnElGaraje",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <TooltipProvider>
            <LayoutMain
              menuItems={[]}
              secondaryMenu={[]}
              userImage={session?.user?.image}
              userMenuItems={[]}
            >
              {children}
            </LayoutMain>
            <Toaster />
          </TooltipProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
