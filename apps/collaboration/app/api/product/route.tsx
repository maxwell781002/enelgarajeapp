import { ImageResponse } from "next/og";
import { getBySlugWithBusiness } from "@repo/model/repository/product";
import { getTranslations } from "next-intl/server";
import ProductOpenGraphCard from "@repo/ui/components/open-graph/product-card";
import { formatPrice } from "@repo/model/lib/utils";
import { NextRequest } from "next/server";

const DESCRIPTION_LENGTH = 500;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const product = await getBySlugWithBusiness(slug);
  const business = product.business;
  const commission = product._commission || 0;
  const t = await getTranslations();
  const description = product.description;

  return new ImageResponse(
    (
      <ProductOpenGraphCard
        t={t}
        imageUrl={product.image.url}
        productName={product.name}
        description={
          description.length > DESCRIPTION_LENGTH
            ? description.slice(0, DESCRIPTION_LENGTH)
            : description
        }
        price={formatPrice(product._price, business.currency)}
        commission={commission && formatPrice(commission, business.currency)}
        stock={product.stock}
        outOfStock={product._outOfStock}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
