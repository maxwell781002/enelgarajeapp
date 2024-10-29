import { categoryRepository } from "@repo/model/repositories/category";
import CategoryMenu from "./category-menu";
import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "./list";
import { addToOrder } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { paginateFrontend } from "@repo/model/repository/product";
import SearchInput from "@repo/ui/components/search";
import { redirect } from "next/navigation";
import { getPlanFeature } from "@repo/model/lib/plans-feature";

export type ProductListWrapperProps = {
  currentBusiness: CompleteBusiness;
  categorySlug?: string;
  baseUrl: string;
  business: CompleteBusiness;
  searchParams: any;
};

export default async function ProductListWrapper({
  currentBusiness,
  categorySlug,
  baseUrl,
  business,
  searchParams,
}: ProductListWrapperProps) {
  const categories = await categoryRepository.getAll(currentBusiness.id);
  const currenItem = categories.find((item: any) => item.slug === categorySlug);
  const { data, hasMore } = await paginateFrontend({
    businessId: business.id,
    categoryId: currenItem?.id,
    ...searchParams,
  });
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };
  const search = async (query: any) => {
    "use server";
    const url = `${baseUrl}?${new URLSearchParams({ ...searchParams, ...query })}`;
    return redirect(url);
  };
  return (
    <>
      <SearchInput className="mb-2" onChange={search} />
      {getPlanFeature<boolean>("CAN_CREATE_CATEGORY", business) && (
        <div className="mb-8">
          <CategoryMenu items={categories} active={currenItem} />
        </div>
      )}
      <ProductList
        data={data}
        hastMore={hasMore}
        categoryId={currenItem?.id}
        businessId={business.id}
        add={add}
      />
    </>
  );
}
