import {
  getCurrentOrder,
  removeFromOrder,
  setQuantity as BaseSetQuantity,
} from "@repo/model/repository/order";
import EmptyCart from "@repo/ui/components/shop-cart/emptyCart";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import CardItem from "@repo/ui/components/shop-cart/shopping-cart/card";
import { revalidatePath } from "next/cache";
import { getTranslations } from "next-intl/server";
import PriceDisplay from "@repo/ui/components/prices/price";
import AlertMessage from "@repo/ui/components/alert-message";
import { CompleteOrderProduct } from "@repo/model/zod/orderproduct";

export type ShoppingCartProps = {
  baseUrl?: string;
  productBaseUrl?: string;
  showCommission?: boolean;
};

export default async function ShoppingCartPage({
  baseUrl = "",
  productBaseUrl = "",
  showCommission,
}: ShoppingCartProps) {
  const order = await getCurrentOrder();
  const remove = async (productId: string) => {
    "use server";
    await removeFromOrder(productId);
    revalidatePath(`${baseUrl}/shopping-cart`);
  };
  const setQuantity = async (productId: string, quantity: number) => {
    "use server";
    await BaseSetQuantity(productId, quantity);
    return revalidatePath(`${baseUrl}/shopping-cart`);
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
        {order.items.map((item: CompleteOrderProduct) => (
          <div key={item.productId} className="mb-2">
            <CardItem
              key={item.productId}
              item={item as any}
              onRemove={remove.bind(null, item.productId)}
              changeProductQuantity={setQuantity.bind(null, item.productId)}
              url={productBaseUrl}
              showCommission={showCommission}
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
        {showCommission && (
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-lg font-semibold">{t("commission")}</span>
            <span className="text-2xl font-bold">
              {/* TODO remove any */}
              <PriceDisplay price={(order as any).commission} />
            </span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Link href={baseUrl || "/"} className="w-full" prefetch={false}>
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
