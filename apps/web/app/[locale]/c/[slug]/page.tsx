import { getCurrentBusiness } from "@repo/model/repository/business";
import ProductList from "../../../../components/product-list";
import { CompleteBusiness } from "@repo/model/zod/business";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<any>;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  searchParams = await searchParams;
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
