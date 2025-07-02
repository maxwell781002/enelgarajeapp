import "@repo/ui/web.css";
import type { ResolvingMetadata } from "next";
import { Karla, Fira_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import RouteLoadingLayout from "@repo/ui/layouts/route-loader-layout";
import { ReferredCode } from "../components/referred-code";
import FacebookOpenNavigator from "@repo/ui/components/facebook-open-navigator";
import GoogleAnalytics from "@repo/ui/components/google-analytics";
import { SessionProvider } from "next-auth/react";

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: ["400", "500", "700"],
});
const sfMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--font-sf-mono",
  weight: ["400", "500", "700"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(
  { params }: LayoutProps,
  parent: ResolvingMetadata,
) {
  const previousImages = (await parent).openGraph?.images || [];
  const title = "EnElGaraje";
  return {
    title: {
      template: "%s | " + title,
      default: title,
    },
    description: "Plataforma de compra/ventas",
    openGraph: {
      images: previousImages,
    },
  };
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${karla.variable} ${sfMono.variable}`}>
        <SessionProvider>
          <FacebookOpenNavigator>
            <ReferredCode>
              <RouteLoadingLayout>
                <div className="flex flex-col min-h-dvh">
                  <NextIntlClientProvider messages={messages}>
                    {children}
                  </NextIntlClientProvider>
                </div>
              </RouteLoadingLayout>
            </ReferredCode>
          </FacebookOpenNavigator>
        </SessionProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
