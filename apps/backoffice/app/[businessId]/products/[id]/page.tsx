import { productRepository } from "@repo/model/repositories/product";
import { CompleteProduct } from "@repo/model/zod/product";
import BackPage from "@repo/ui/components/back-page";
import ProductDetail from "@repo/ui/components/product-detail";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: { id: string; businessId: string };
};

export default async function Page({ params: { id, businessId } }: PageProps) {
  const t = await getTranslations("Product");
  const product = await productRepository.get(id);
  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <ProductDetail product={product as CompleteProduct} t={t} />
    </BackPage>
  );
}
