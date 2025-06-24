import { getCurrentBusiness } from "@repo/model/repository/business";
import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "../../components/product-list";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  searchParams = await searchParams;
  const currentBusiness = await getCurrentBusiness();
  if (!currentBusiness) return <div>Not found</div>;
  return (
    <ProductList
      business={currentBusiness as CompleteBusiness}
      searchParams={searchParams}
    />
  );
}
