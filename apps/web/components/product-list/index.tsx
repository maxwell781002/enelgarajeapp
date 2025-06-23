import { categoryRepository } from "@repo/model/repositories/category";
import CategoryMenu from "./category-menu";
import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "./list";
import { paginateFrontend } from "@repo/model/repository/product";

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
  return (
    <>
      <div className="mb-8">
        <CategoryMenu items={categories} active={currenItem} />
      </div>
      <ProductList
        data={data}
        hastMore={hasMore}
        categoryId={currenItem?.id}
        businessId={business.id}
      />
    </>
  );
}
