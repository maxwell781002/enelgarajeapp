import { getCurrentBusiness } from "@repo/model/repository/business";
import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "../../components/product-list";

export default async function Page({ searchParams }: { searchParams: any }) {
  const currentBusiness = await getCurrentBusiness();
  if (!currentBusiness) return <div>Not found</div>;
  return (
    <ProductList
      currentBusiness={currentBusiness as CompleteBusiness}
      baseUrl="/"
      business={currentBusiness}
      searchParams={searchParams}
    />
  );
}
