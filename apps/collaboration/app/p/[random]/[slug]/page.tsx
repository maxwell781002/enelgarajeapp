import { formatPrice } from "@repo/model/lib/utils";
import { getBySlugWithBusiness } from "@repo/model/repository/product";
import ProductOpenGraphCard from "@repo/ui/components/open-graph/product-card";
import { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export type PageProps = {
  params: {
    slug: string;
    random: string;
  };
};

export async function generateMetadata({
  params: { slug, random },
}: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  return {
    title: product.name,
    openGraph: {
      images: `/api/product?slug=${slug}&random=${random}`,
    },
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const product = await getBySlugWithBusiness(slug);
  const business = product.business;
  const commission = product._commission || 0;
  const t = await getTranslations();
  return <div>{product.name}</div>;
}
