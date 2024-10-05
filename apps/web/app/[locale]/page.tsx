import { CardItem } from "@repo/ui/components/cardList/card";
import { getByBusiness } from "@repo/model/repository/category";
import {
  addToOrder,
  getCurrentOrder,
  hasProduct,
  ProductShopCartItem,
} from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { getCurrentBusiness } from "@repo/model/repository/business";
import { CompleteBusiness } from "@repo/model/zod/business";
import CategoryMenu from "../../components/product-list/category-menu";
import { categoryRepository } from "@repo/model/repositories/category";
import ProductList from "../../components/product-list";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page() {
  const currentBusiness = await getCurrentBusiness();
  if (!currentBusiness) return <div>Not found</div>;
  return <ProductList currentBusiness={currentBusiness as CompleteBusiness} />;
}

export async function PageV({ params: { locale } }: PageProps) {
  const currentBusiness = await getCurrentBusiness();
  if (!currentBusiness) return <div>Not found</div>;
  const list = await getByBusiness(currentBusiness as CompleteBusiness);
  const baseUrl = `/${locale}`;
  const order = await getCurrentOrder();
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };
  const categories = await categoryRepository.getAll(currentBusiness.id);

  return (
    <>
      <div className="mb-8">
        <CategoryMenu items={categories} />
      </div>
      {list.map(({ products, name, id }: any) => (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map(async (item: any) => (
            <CardItem
              onAdd={add.bind(null, item.id)}
              key={item.id}
              item={
                {
                  ...item,
                  _inCart: await hasProduct(item.id, order),
                } as ProductShopCartItem
              }
              baseUrl={baseUrl}
            />
          ))}
        </div>
      ))}
    </>
  );
}
