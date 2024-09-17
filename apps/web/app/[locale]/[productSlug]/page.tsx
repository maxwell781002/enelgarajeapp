import { getBySlug } from "@repo/model/repository/product";
import {
  addToOrder,
  getCurrentOrder,
  hasProduct,
} from "@repo/model/repository/order";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import { AddCart } from "./add-cart";
import ProductDetail from "@repo/ui/components/product-detail";
import { CompleteProduct } from "@repo/model/zod/product";

type PageProps = {
  params: {
    productSlug: string;
    locale: string;
  };
};

export default async function Page({
  params: { productSlug, locale },
}: PageProps) {
  const baseUrl = `/${locale}/${productSlug}`;
  const item = await getBySlug(productSlug);
  const order = await getCurrentOrder();
  const add = async (productId: string) => {
    "use server";
    await addToOrder(productId);
    revalidatePath(baseUrl);
  };

  const t = await getTranslations("Product");

  if (!item) return <div>Not found</div>;

  const btnAdd = (
    <AddCart
      inCart={await hasProduct(item.id, order)}
      add={add.bind(null, item.id)}
    />
  );

  return (
    <ProductDetail
      product={item as CompleteProduct}
      addCartBtn={btnAdd}
      t={t}
    />
  );
}
