"use client";

import ProductList from "@repo/ui/components/shop-cart/checkout/product-list";
import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { useStore } from "@repo/ui/stores/index";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useCheckoutNeighborhood } from "@repo/ui/components/shop-cart/checkout/hooks";
import { CompleteBusiness } from "@repo/model/zod/business";
import Total from "@repo/ui/components/shop-cart/checkout/total";
import AlertMessage from "@repo/ui/components/alert-message";
import { Button } from "@repo/ui/components/button";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";

export type RenderOptions = {
  neighborhoods: NeighborhoodWithShipping[];
  form: any;
  wantDomicile: boolean;
};

export type CheckoutPageProps = {
  action: (data: any) => Promise<any>;
  form: any;
  addressName: string;
  business: CompleteBusiness;
  render: (options: RenderOptions) => ReactNode;
};

export default function CheckoutPage({
  render,
  action,
  form,
  addressName,
  business,
}: CheckoutPageProps) {
  const t = useTranslations("Checkout");
  const orderTotal = useStore(useShopCart, (state) => state.orderTotal(false));
  const orderItems = useStore(useShopCart, (state) => state.items());
  form.setValue(
    "cartItems",
    orderItems?.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  );
  const [shopCartHasError, setShopCartHasError] = useState(false);
  const handlerAction = async (data: any) => {
    const result = await action(data);
    if (result?.message === "out_of_stock") {
      setShopCartHasError(true);
    }
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
        {shopCartHasError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
          />
        )}
        <Button
          type="submit"
          disabled={neighborhoodLoading || form.formState.isSubmitting}
        >
          {t("continue")}
        </Button>
      </form>
      <ProductList />
    </div>
  );
}
