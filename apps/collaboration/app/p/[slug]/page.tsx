import { formatPrice } from "@repo/model/lib/utils";
import { getBySlugWithBusiness } from "@repo/model/repository/product";
import ProductOpenGraphCard from "@repo/ui/components/open-graph/product-card";
import { getTranslations } from "next-intl/server";

export type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params: { slug } }: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  return {
    title: product.name,
    openGraph: {
      images: `/api/product?slug=${slug}`,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  const business = product.business;
  const commission = product._commission || 0;
  const t = await getTranslations();
  return (
    <div>
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
    </div>
  );
}
