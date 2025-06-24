import "@repo/ui/web.css";
import type { ResolvingMetadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { CompleteBusiness } from "@repo/model/zod/index";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { Header } from "../../components/layout/header";
import { Footer } from "../../components/layout/footer";
import { BusinessContextProvider } from "@repo/ui/context/business";
import RouteLoadingLayout from "@repo/ui/layouts/route-loader-layout";
import { getSite } from "@repo/model/repository/business-site";
import { ReferredCode } from "../../components/referred-code";
import FacebookOpenNavigator from "@repo/ui/components/facebook-open-navigator";
import Error404 from "@repo/ui/components/page-errors/404";
import { ProductContextProvider } from "apps/web/context/product-context";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
  const business = (await getCurrentBusiness()) as CompleteBusiness;
  const site = await getSite(business);
  const image = site.logo;
  return {
    title: business?.name || "EnElGaraje",
    description: business?.description || "Plataforma de compra/ventas",
    openGraph: {
      images: image ? [image, ...previousImages] : previousImages,
    },
  };
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();
  const business = (await getCurrentBusiness()) as CompleteBusiness;
  const site = await getSite(business);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <FacebookOpenNavigator>
          <ReferredCode>
            <RouteLoadingLayout>
              <div className="flex flex-col min-h-dvh">
                <NextIntlClientProvider messages={messages}>
                  {business ? (
                    <BusinessContextProvider business={business}>
                      <ProductContextProvider>
                        <Header
                          business={business}
                          locale={locale}
                          logo={site.logo}
                        />
                        <main className="flex-1 container">{children}</main>
                      </ProductContextProvider>
                      <Footer {...site} />
                    </BusinessContextProvider>
                  ) : (
                    <Error404 />
                  )}
                </NextIntlClientProvider>
              </div>
            </RouteLoadingLayout>
          </ReferredCode>
        </FacebookOpenNavigator>
      </body>
    </html>
  );
}
