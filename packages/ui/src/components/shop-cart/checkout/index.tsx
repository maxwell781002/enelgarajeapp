"use client";

import ProductList from "@repo/ui/components/shop-cart/checkout/product-list";
import { ReactNode, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useStore } from "@repo/ui/stores/index";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useCheckoutNeighborhood } from "@repo/ui/components/shop-cart/checkout/hooks";
import { CompleteBusiness } from "@repo/model/zod/business";
import Total from "@repo/ui/components/shop-cart/checkout/total";
import AlertMessage from "@repo/ui/components/alert-message";
import { Button } from "@repo/ui/components/button";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { useRouter } from "next/navigation";

export type RenderOptions = {
  neighborhoods: NeighborhoodWithShipping[];
  form: any;
  wantDomicile: boolean;
  neighborhoodLoading: boolean;
};

export type CheckoutPageProps = {
  action: (data: any) => Promise<any>;
  form: any;
  addressName: string;
  business: CompleteBusiness;
  render: (options: RenderOptions) => ReactNode;
  successfulUrl: (id: string) => string;
};

export default function CheckoutPage({
  render,
  action,
  form,
  addressName,
  business,
  successfulUrl,
}: CheckoutPageProps) {
  const t = useTranslations("Checkout");
  const orderTotal = useStore(useShopCart, (state) => state.orderTotal());
  const orderItems = useStore(useShopCart, (state) => state.items());
  const clear = useShopCart((state) => state.clear);
  const [orderRegistering, startOrderRegistering] = useTransition();
  const router = useRouter();
  form.setValue(
    "cartItems",
    orderItems?.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      customPrice: item.customPrice,
    })),
  );
  const [shopCartOutOfStockError, setShopCartOutOfStockError] = useState(false);
  const [shopCartProductInactiveError, setShopCartProductInactiveError] =
    useState(false);
  const handlerAction = async (data: any) => {
    return startOrderRegistering(async () => {
      const { id, error } = await action(data);
      if (error === "out_of_stock") {
        return setShopCartOutOfStockError(true);
      }
      if (error === "product_inactive") {
        return setShopCartProductInactiveError(true);
      }
      clear();
      return router.push(successfulUrl(id));
    });
  };
  const {
    neighborhoods,
    shippingPrice,
    total,
    wantDomicile,
    neighborhoodLoading,
  } = useCheckoutNeighborhood(
    form,
    business.id as string,
    addressName,
    orderTotal as number,
  );
  const nestedForm = render({
    neighborhoods,
    form,
    wantDomicile,
    neighborhoodLoading,
  });

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <form
        onSubmit={form.handleSubmit((data: any) => handlerAction({ ...data }))}
        className="space-y-8"
      >
        {nestedForm}
        <Total
          shippingPrice={shippingPrice}
          subtotal={orderTotal as number}
          total={total}
          wantDomicile={wantDomicile as boolean}
        />
        {shopCartOutOfStockError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
          />
        )}
        {shopCartProductInactiveError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_product_inactive")}
          />
        )}
        <Button
          type="submit"
          disabled={neighborhoodLoading || orderRegistering}
        >
          {t("continue")}
        </Button>
      </form>
      <ProductList />
    </div>
  );
}
