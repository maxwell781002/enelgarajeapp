"use client";

import ProductList from "@repo/ui/components/shop-cart/checkout/product-list";
import { PropsWithChildren } from "react";
import { useTranslations } from "next-intl";

export type CheckoutPageProps = PropsWithChildren;

export default function CheckoutPage({ children }: CheckoutPageProps) {
  const t = useTranslations("Checkout");
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      {children}
      <ProductList />
    </div>
  );
}
