import { ImageResponse } from "next/og";
import { getBySlugWithBusiness } from "@repo/model/repository/product";
import { PageProps } from "./page";
import { getTranslations } from "next-intl/server";
import ProductOpenGraphCard from "@repo/ui/components/open-graph/product-card";
import { formatPrice } from "@repo/model/lib/utils";

export default async function Image({ params: { slug } }: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  const business = product.business;
  const commission = product._commission || 0;
  const t = await getTranslations();

  return new ImageResponse(
    (
      <ProductOpenGraphCard
        t={t}
        imageUrl={product.image.url}
        productName={product.name}
        description={product.description}
        price={formatPrice(product._price, business.currency)}
        commission={commission && formatPrice(commission, business.currency)}
        stock={product.stock}
        outOfStock={product._outOfStock}
      />
    ),
  );
}
