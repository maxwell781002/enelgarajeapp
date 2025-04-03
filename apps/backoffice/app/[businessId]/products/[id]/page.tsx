import { Pencil1Icon, Cross1Icon } from "@radix-ui/react-icons";
import { productRepository } from "@repo/model/repositories/product";
import BackPage from "@repo/ui/components/back-page";
import { Button } from "@repo/ui/components/ui/button";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import BtnRemove from "./button-remove";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import BooleanValue from "@repo/ui/components/boolean-value";
import SharedLinks from "@repo/ui/components/shared-links";
import { getCollaboratorProductUrl } from "@repo/model/repository/product";
import ProductDetail from "@repo/ui/components/product-page/product";
import { IProduct } from "@repo/model/types/product";

type PageProps = {
  params: { id: string; businessId: string };
};

export default async function Page({ params: { id, businessId } }: PageProps) {
  const t = await getTranslations("Product");
  const product = await productRepository.getAllProduct({ id });
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
  const productCollaboratorUrl = getCollaboratorProductUrl(product);

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
        <div className="flex flex-col sm:flex-row sm:gap-4 bg-muted-foreground rounded-lg p-4 text-white mb-4">
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
        <div className="flex flex-col sm:flex-row sm:gap-4 bg-white rounded-lg p-4 text-black mb-4">
          <p>{t("lbCollaboratorUrl")}</p>
          <SharedLinks
            socialNetworks={["FACEBOOK", "WHATSAPP", "TELEGRAM"]}
            url={productCollaboratorUrl}
            text={product.name}
          />
        </div>
        <Tabs defaultValue="general">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="w-full">
              {t("tabGeneral")}
            </TabsTrigger>
            <TabsTrigger value="socialNetworks" className="w-full">
              {t("tabSocialNetworks")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <ProductDetail
              product={product as IProduct}
              t={t}
              showCommission
              showStock
              showBusinessProfit
            />
          </TabsContent>
          <TabsContent value="socialNetworks">
            aaaa
            {/* <ProductDetailPage product={product} /> */}
          </TabsContent>
        </Tabs>
      </>
    </BackPage>
  );
}
