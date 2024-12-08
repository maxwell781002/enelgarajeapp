import ProductPage, {
  generateMetadata as BaseGenerateMetadata,
} from "@repo/ui/components/product-page/page";
import { ResolvingMetadata } from "next";

export type ProductPageProps = {
  params: {
    productSlug: string;
    locale: string;
  };
};

export async function generateMetadata(
  { params: { productSlug } }: ProductPageProps,
  parent: ResolvingMetadata,
) {
  return BaseGenerateMetadata(productSlug, parent);
}

export default async function Page({
  params: { productSlug, locale },
}: ProductPageProps) {
  return <ProductPage productSlug={productSlug} locale={locale} />;
}
