import ProductPage, {
  generateMetadata as BaseGenerateMetadata,
} from "@repo/ui/components/product-page/page";
import { ResolvingMetadata } from "next";

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
  const { productSlug, locale } = await params;
  return <ProductPage productSlug={productSlug} locale={locale} />;
}
