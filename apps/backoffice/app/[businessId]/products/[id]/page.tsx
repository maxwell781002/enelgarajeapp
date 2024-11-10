import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import { productRepository } from "@repo/model/repositories/product";
import BackPage from "@repo/ui/components/back-page";
import ProductDetail from "@repo/ui/components/product-detail";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import BtnRemove from "./button-remove";
import { IProduct } from "@repo/model/types/product";
import BooleanValue from "@repo/ui/components/boolean-value";

type PageProps = {
  params: { id: string; businessId: string };
};

export default async function Page({ params: { id, businessId } }: PageProps) {
  const t = await getTranslations("Product");
  const product = await productRepository.get(id);
  const remove = async (id: string) => {
    "use server";
    try {
      await productRepository.remove(id);
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  };

  return (
    <BackPage href={`/${businessId}/products`} urlTitle="Ir a productos">
      <>
        <div className="flex justify-end">
          <Link href={`/${businessId}/products/form?id=${id}`}>
            <Button size="icon" className="mr-2">
              <Pencil1Icon />
            </Button>
          </Link>
          <BtnRemove
            entityId={id}
            btnIcon={<Cross1Icon className="w-5 h-5" />}
            title={t("remove_dialog.title")}
            description={t("remove_dialog.description")}
            action={remove}
            btnCancelText={t("remove_dialog.cancel")}
            btnContinueText={t("remove_dialog.continue")}
            btnAttr={{ variant: "destructive" }}
            url={`/${businessId}/products`}
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-4 bg-muted-foreground rounded-lg p-4 text-white">
          {t("lbActive")}: <BooleanValue value={product.active} />
          {t("lbIsNew")}: <BooleanValue value={product.isNew} />
          {t("lbIsExhaustible")}: <BooleanValue value={product.isExhaustible} />
          {t("lbAllowOrderOutOfStock")}:{" "}
          <BooleanValue value={product.allowOrderOutOfStock} />
          <div>
            {t("lbPriority")}: {product.priority}
          </div>
          <div>
            {t("lbStock")}: {product.stock}
          </div>
        </div>
        <ProductDetail product={product as IProduct} t={t} />
      </>
    </BackPage>
  );
}
