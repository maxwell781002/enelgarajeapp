import { getCurrentBusiness } from "@repo/model/repository/business";
import ProductList from "../../../../components/product-list";
import { CompleteBusiness } from "@repo/model/zod/business";

export default async function Page({
  params: { slug },
  searchParams,
}: {
  searchParams: any;
  params: { slug: string };
}) {
  const currentBusiness = (await getCurrentBusiness()) as CompleteBusiness;
  return (
    <ProductList
      currentBusiness={currentBusiness}
      categorySlug={slug}
      baseUrl={`/c/${slug}`}
      business={currentBusiness}
      searchParams={searchParams}
    />
  );
}
