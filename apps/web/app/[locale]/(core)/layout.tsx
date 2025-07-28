import "@repo/ui/web.css";
import type { ResolvingMetadata } from "next";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { Header } from "../../../components/layout/header";
import { Footer } from "../../../components/layout/footer";
import { BusinessContextProvider } from "@repo/ui/context/business";
import { getSite } from "@repo/model/repository/business-site";
import Error404 from "@repo/ui/components/page-errors/404";
import { ProductContextProvider } from "apps/web/context/product-context";
import { CompleteBusiness } from "@repo/model/zod/business";
import { WholesaleContextProvider } from "apps/web/context/wholesale";

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
  const title = business?.name || "EnElGaraje";
  return {
    title: {
      template: "%s | " + title,
      default: title,
    },
    description: business?.description || "Plataforma de compra/ventas",
    openGraph: {
      images: image ? [image, ...previousImages] : previousImages,
    },
  };
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = await params;
  const business = (await getCurrentBusiness()) as CompleteBusiness;
  const site = await getSite(business);

  return (
    <>
      {business ? (
        <BusinessContextProvider business={business}>
          <WholesaleContextProvider>
            <ProductContextProvider>
              <Header business={business} locale={locale} logo={site.logo} />
              <main className="flex-1 container">{children}</main>
            </ProductContextProvider>
            <Footer {...site} />
          </WholesaleContextProvider>
        </BusinessContextProvider>
      ) : (
        <Error404 />
      )}
    </>
  );
}
