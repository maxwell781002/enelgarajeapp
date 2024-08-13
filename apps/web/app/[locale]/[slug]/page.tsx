import { Row } from "@repo/ui/components/cardList/row";
import { CardItem } from "@repo/ui/components/cardList/card";
import { getBySlugBusiness } from "@repo/model/repository/category";
import {
  addToOrder,
  getCurrentOrder,
  hasProduct,
  ProductShopCartItem,
} from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";

type PageProps = {
  params: {
    slug: string;
    locale: string;
  };
};

export default async function Page({ params: { slug, locale } }: PageProps) {
  const list = await getBySlugBusiness(slug);
  const baseUrl = `/${locale}/${slug}`;
  const order = await getCurrentOrder();
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };

  return (
    <>
      {list.map(({ products, name, id }) => (
        <Row name={name} key={id}>
          {products.map(async (item) => (
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
        </Row>
      ))}
    </>
  );
}
