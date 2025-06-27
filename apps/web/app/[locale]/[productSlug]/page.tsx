import { BtnAddCart } from "@repo/ui/components/add-cart";
import { generateMetadata as BaseGenerateMetadata } from "@repo/ui/components/product-page/page";
import ProductGallery from "apps/web/components/product-detail/ProductGallery";
import Tabs from "apps/web/components/product-detail/Tabs";
import { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { formatPrice } from "packages/model/lib/utils";
import { getCurrentBusiness } from "packages/model/repository/business";
import { getBySlug } from "packages/model/repository/product";
import { IProduct } from "packages/model/types/product";
import OnLoad from "@repo/ui/google-analytics/on-load";

export type ProductPageProps = {
  params: Promise<{
    productSlug: string;
    locale: string;
  }>;
};

export async function generateMetadata(
  { params }: ProductPageProps,
  parent: ResolvingMetadata,
) {
  const { productSlug } = await params;
  return BaseGenerateMetadata(productSlug, parent);
}

export default async function Page({ params }: ProductPageProps) {
  const { productSlug } = await params;
  const business = await getCurrentBusiness();
  const product = await getBySlug(productSlug);
  const t = await getTranslations("Product");
  return (
    <>
      <OnLoad event={{ event: "view_item", product }} />
      <section className="md:section-sm">
        <div className="container">
          <div className="row justify-center">
            {/* right side contents */}
            <div className="col-10 md:col-8 lg:col-6">
              <ProductGallery images={[product?.image]} />
            </div>
            {/* left side contents */}
            <div className="col-10 md:col-8 lg:col-5 md:ml-7 py-6 lg:py-0">
              <h1 className="text-3xl md:h2 mb-2 md:mb-6">{product?.name}</h1>

              <div className="flex gap-2 items-center">
                <h4 className="text-text-light dark:text-darkmode-text-light max-md:h2">
                  {formatPrice(product?.price, business?.currency)}
                </h4>
                {product?.offerPrice > 0 ? (
                  <s className="text-text-light max-md:h3 dark:text-darkmode-text-light">
                    {formatPrice(product?.offerPrice, business?.currency)}
                  </s>
                ) : (
                  ""
                )}
              </div>
              <div className="flex gap-4 mt-8 md:mt-10 mb-6">
                {t("addToCartLabel")}
                <BtnAddCart
                  product={product as IProduct}
                  outOfStock={product._outOfStock}
                />
              </div>
              <hr className="my-6 border border-border dark:border-border/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Description of a product  */}
      {(product?.description || product?.moreInfo) && (
        <section>
          <div className="container">
            <div className="row">
              <div className="col-10 lg:col-11 mx-auto mt-12">
                <Tabs
                  description={product.description}
                  moreInfo={product.moreInfo}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
