import { userRepository } from "@repo/model/repositories/user";
import { getBusinessById } from "@repo/model/repository/business";
import { getCurrentUser } from "@repo/model/repository/user";
import ProductPage, {
  generateMetadata as BaseGenerateMetadata,
} from "@repo/ui/components/product-page/page";
import SharedLinks from "@repo/ui/components/shared-links";
import { ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";
import { getBySlug } from "@repo/model/repository/product";
import OnLoad from "@repo/ui/components/google-analytics/on-load";

export type ProductPageProps = {
  params: Promise<{
    productSlug: string;
    businessId: string;
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
  const { productSlug, locale, businessId } = await params;
  const t = await getTranslations("Product");
  const user = await getCurrentUser();
  const business = await getBusinessById(businessId);
  const referredCode = await userRepository.getReferredCode(
    user.id,
    businessId,
  );
  const product = await getBySlug(productSlug);
  return (
    <>
      <OnLoad event={{ event: "view_item", product }} />
      <div className="flex flex-col gap-4 bg-white rounded-lg p-4 text-black">
        <div>
          <p className="font-bold">{t("lbSharedByCollaborator")}</p>
          <p className="text-muted-foreground text-sm">
            {t("lbProductSharedByCollaboratorDescription")}
          </p>
        </div>
        <SharedLinks
          socialNetworks={["FACEBOOK", "WHATSAPP", "TELEGRAM"]}
          url={`https://${business.slug}/${productSlug}?rc=${referredCode}`}
        />
        <div>
          <p className="font-bold">SKU: {product.sku}</p>
        </div>
      </div>
      <ProductPage
        showCommission
        showStock
        productSlug={productSlug}
        locale={locale}
      />
    </>
  );
}
