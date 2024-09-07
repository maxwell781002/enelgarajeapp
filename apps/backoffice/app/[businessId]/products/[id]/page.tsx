import { Pencil1Icon } from "@radix-ui/react-icons";
import { productRepository } from "@repo/model/repositories/product";
import { CompleteProduct } from "@repo/model/zod/product";
import BackPage from "@repo/ui/components/back-page";
import ProductDetail from "@repo/ui/components/product-detail";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type PageProps = {
  params: { id: string; businessId: string };
};

export default async function Page({ params: { id, businessId } }: PageProps) {
  const t = await getTranslations("Product");
  const product = await productRepository.get(id);
  const btnEdit = (
    <Link href={`/${businessId}/products/form?id=${id}`}>
      <Button>
        <Pencil1Icon className="mr-2" /> {t("updateProduct")}
      </Button>
    </Link>
  );
  return (
    <BackPage
      href={`/${businessId}/products`}
      urlTitle="Ir a productos"
      headerChildren={btnEdit}
    >
      <ProductDetail product={product as CompleteProduct} t={t} />
    </BackPage>
  );
}
