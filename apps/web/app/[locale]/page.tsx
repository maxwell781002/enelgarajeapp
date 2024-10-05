import { Row } from "@repo/ui/components/cardList/row";
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
import CategoryMenu from "../../components/category-menu";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params: { locale } }: PageProps) {
  const list = await getByBusiness(
    (await getCurrentBusiness()) as CompleteBusiness,
  );
  const baseUrl = `/${locale}`;
  const order = await getCurrentOrder();
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };

  return (
    <>
      <div className="mb-8">
        <CategoryMenu />
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
