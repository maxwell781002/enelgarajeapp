import { categoryRepository } from "@repo/model/repositories/category";
import CategoryMenu from "./category-menu";
import { CompleteBusiness } from "@repo/model/zod/business";
import ProductList from "./list";
import { addToOrder } from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { paginateFrontend } from "@repo/model/repository/product";

export default async function ProductListWrapper({
  currentBusiness,
  categorySlug,
  baseUrl,
  businessId,
}: {
  currentBusiness: CompleteBusiness;
  categorySlug?: string;
  baseUrl: string;
  businessId: string;
}) {
  const categories = await categoryRepository.getAll(currentBusiness.id);
  const currenItem = categories.find((item: any) => item.slug === categorySlug);
  const { data, hasMore } = await paginateFrontend({
    businessId,
    categoryId: currenItem?.id,
  });
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };
  return (
    <>
      <div className="mb-8">
        <CategoryMenu items={categories} active={currenItem} />
      </div>
      <ProductList
        data={data}
        hastMore={hasMore}
        categoryId={currenItem?.id}
        businessId={businessId}
        add={add}
      />
    </>
  );
}
