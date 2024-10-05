import { categoryRepository } from "@repo/model/repositories/category";
import CategoryMenu from "./category-menu";
import { CompleteBusiness } from "@repo/model/zod/business";

export default async function ProductList({
  currentBusiness,
  categorySlug,
}: {
  currentBusiness: CompleteBusiness;
  categorySlug?: string;
}) {
  const categories = await categoryRepository.getAll(currentBusiness.id);
  return (
    <>
      <div className="mb-8">
        <CategoryMenu items={categories} activeSlug={categorySlug} />
      </div>
      product list
    </>
  );
}
