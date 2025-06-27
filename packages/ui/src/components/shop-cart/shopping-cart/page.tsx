"use client";

import EmptyCart from "@repo/ui/components/shop-cart/emptyCart";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import CardItem, {
  CardItemProps,
} from "@repo/ui/components/shop-cart/shopping-cart/card";
import PriceDisplay from "@repo/ui/components/prices/price";
import AlertMessage from "@repo/ui/components/alert-message";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useTranslations } from "next-intl";
import { useStore } from "@repo/ui/stores/index";
import { ShopCartOrderItem } from "@repo/model/repository/shop-cart";
import { useEffect, useState, useTransition } from "react";
import OnLoad from "@repo/ui/google-analytics/on-load";

export type ShoppingCartProps = {
  baseUrl?: string;
  productBaseUrl?: string;
  showCommission?: boolean;
  businessId: string;
  isCollaborator?: boolean;
  CustomCartItem?: React.ComponentType<CardItemProps>;
};

export default function ShoppingCartPage({
  baseUrl = "",
  productBaseUrl = "",
  showCommission = false,
  businessId,
  isCollaborator = false,
  CustomCartItem = CardItem,
}: ShoppingCartProps) {
  const t = useTranslations("ShopCart");
  const items = useStore(useShopCart, (state) => state.items());
  const [hasProductOutOfStock, setHasProductOutOfStock] = useState(false);
  const [hasProductInactive, setHasProductInactive] = useState(false);
  const [checkingStock, startCheckingStock] = useTransition();
  useEffect(() => {
    if (items?.length) {
      startCheckingStock(() =>
        fetch(
          `/api/shop-cart?businessId=${businessId}&isCollaborator=${isCollaborator}`,
          {
            method: "POST",
            body: JSON.stringify(items),
          },
        )
          .then((res) => res.json())
          .then(({ hasProductOutOfStock, hasProductInactive }) => {
            setHasProductOutOfStock(hasProductOutOfStock);
            setHasProductInactive(hasProductInactive);
          }),
      );
    }
  }, [items]);

  const hasItems = useStore(useShopCart, (state) => state.hasItems());
  const orderTotal = useStore(useShopCart, (state) => state.orderTotal());
  const commission = useStore(useShopCart, (state) => state.commission());
  const hasItemWithErrors = useStore(useShopCart, (state) =>
    state.hasItemWithErrors(),
  );
  const remove = useShopCart.use.remove();
  const setQuantity = useShopCart.use.setQuantity();

  if (!hasItems) {
    return <EmptyCart url={productBaseUrl || "/"} />;
  }

  return (
    <div className="flex flex-col gap-6">
      {!!items?.length && (
        <OnLoad event={{ event: "view_cart", cartItems: items }} />
      )}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        {t("title")}
      </h1>
      {hasProductOutOfStock && (
        <AlertMessage
          variant="destructive"
          text={t("errors.has_out_of_stock")}
        />
      )}
      {hasProductInactive && (
        <AlertMessage
          variant="destructive"
          text={t("errors.has_product_inactive")}
        />
      )}
      <div className="overflow-auto">
        {items?.map((item: ShopCartOrderItem) => (
          <div key={item.productId} className="mb-2">
            <CustomCartItem
              key={item.productId}
              item={item as any}
              onRemove={() => remove(item.productId)}
              changeProductQuantity={(quantity: number) =>
                setQuantity(item.productId, quantity)
              }
              url={productBaseUrl}
              showCommission={showCommission}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {showCommission && (
          <div className="flex items-center justify-between text-blue-500">
            <span className="text-lg font-semibold">{t("commission")}</span>
            <span className="text-2xl font-bold">
              <PriceDisplay price={commission as number} />
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{t("total_cart")}</span>
          <span className="text-2xl font-bold">
            <PriceDisplay price={orderTotal as number} />
          </span>
        </div>
        <div className="flex w-full justify-between">
          <Link href={productBaseUrl || "/"} prefetch={false}>
            <Button variant="outline">{t("continue_shopping")}</Button>
          </Link>
          <Link href={`${baseUrl}/checkout`} prefetch={false}>
            <Button
              disabled={
                hasProductOutOfStock ||
                hasProductInactive ||
                checkingStock ||
                hasItemWithErrors
              }
            >
              {t("checkout")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
