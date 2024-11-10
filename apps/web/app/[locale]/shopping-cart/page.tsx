import {
  decrementItem,
  getCurrentOrder,
  incrementItem,
  removeFromOrder,
} from "@repo/model/repository/order";
import EmptyCart from "../../../components/emptyCart";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import CardItem from "./card";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import PriceDisplay from "@repo/ui/components/price";
import AlertMessage from "../../../../../packages/ui/src/components/alert-message";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function Page({ params: { locale } }: PageProps) {
  const order = await getCurrentOrder();
  const baseUrl = `/${locale}`;
  const remove = async (productId: string) => {
    "use server";
    await removeFromOrder(productId);
    revalidatePath(`/${baseUrl}/shopping-cart`);
  };

  const increment = async (productId: string) => {
    "use server";
    await incrementItem(productId);
    revalidatePath(`/${baseUrl}/shopping-cart`);
  };

  const decrement = async (productId: string) => {
    "use server";
    await decrementItem(productId);
    revalidatePath(`/${baseUrl}/shopping-cart`);
  };

  if (!order || order.items.length === 0) {
    return <EmptyCart url={baseUrl} />;
  }

  const t = await getTranslations("ShopCart");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("title")}
      </h1>
      {order.hasProductOutOfStock && (
        <AlertMessage
          variant="destructive"
          text={t("errors.has_out_of_stock")}
        />
      )}
      <div className="overflow-auto">
        {order.items.map((item) => (
          <div key={item.productId} className="mb-2">
            <CardItem
              item={item as any}
              onRemove={remove.bind(null, item.productId)}
              add={increment.bind(null, item.productId)}
              sub={decrement.bind(null, item.productId)}
              url={baseUrl}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{t("total_cart")}</span>
          <span className="text-2xl font-bold">
            <PriceDisplay price={order.total} />
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={baseUrl} className="w-full" prefetch={false}>
            <Button variant="outline">{t("continue_shopping")}</Button>
          </Link>
          <Link
            href={`${baseUrl}/checkout`}
            className="w-full"
            prefetch={false}
          >
            <Button className="w-full" disabled={order.hasProductOutOfStock}>
              {t("checkout")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
