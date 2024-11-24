import "@repo/ui/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CompleteBusiness } from "@repo/model/zod/index";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "EnElGaraje",
  description: "Plataforma de compra/ventas",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const business = (await getCurrentBusiness()) as CompleteBusiness;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex flex-col min-h-dvh">
          <NextIntlClientProvider messages={messages}>
            {business ? (
              <>
                <Header business={business} locale={locale} logo="/logo.png" />
                <main className="flex-1 container pt-20 md:py-16 lg:py-20">
                  {children}
                </main>
                <Footer />
              </>
            ) : (
              <h1>not found</h1>
            )}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
