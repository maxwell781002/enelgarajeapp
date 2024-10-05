import { getCurrentBusiness } from "@repo/model/repository/business";
import ProductList from "../../../../components/product-list";
import { CompleteBusiness } from "@repo/model/zod/business";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const currentBusiness = await getCurrentBusiness();
  return (
    <ProductList
      currentBusiness={currentBusiness as CompleteBusiness}
      categorySlug={slug}
    />
  );
}
