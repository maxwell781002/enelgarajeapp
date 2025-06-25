import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "./list";
import { paginateFrontend } from "@repo/model/repository/product";
import EmptyProductList from "./empty";

export type ProductListWrapperProps = {
  business: CompleteBusiness;
  searchParams: any;
};

export default async function ProductListWrapper({
  business,
  searchParams,
}: ProductListWrapperProps) {
  const { data, hasMore } = await paginateFrontend({
    businessId: business.id,
    ...searchParams,
  });
  return (
    <ProductList
      data={data}
      hastMore={hasMore}
      businessId={business.id}
      emptyComponent={<EmptyProductList />}
    />
  );
}
