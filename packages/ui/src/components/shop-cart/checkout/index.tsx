"use client";

import ProductList from "@repo/ui/components/shop-cart/checkout/product-list";
import CheckoutForm from "@repo/ui/components/shop-cart/checkout/form";
import { AddressType, TUserRegisterSchema } from "@repo/model/validation/user";
import { useCheckoutForm } from "@repo/ui/components/shop-cart/checkout/hooks";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteUser } from "@repo/model/zod/user";
import { useState } from "react";
import { useTranslations } from "next-intl";

export type CheckoutPageProps = {
  business: CompleteBusiness;
  user: CompleteUser;
  checkout: (data: TUserRegisterSchema) => Promise<any>;
};

export default function CheckoutPage({
  business,
  user,
  checkout,
}: CheckoutPageProps) {
  const t = useTranslations("Checkout");
  const [addressType, setAddressType] = useState(AddressType.newAddress);
  const { form } = useCheckoutForm(user, business, addressType, checkout);
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <CheckoutForm form={form} action={checkout} buttonDisabled={false} />
      <ProductList />
    </div>
  );
}
