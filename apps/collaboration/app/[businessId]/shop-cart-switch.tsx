"use client";

import { CompleteBusiness } from "@repo/model/zod/business";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { PropsWithChildren, useEffect } from "react";

export type ShopCartSwitchProps = {
  business: CompleteBusiness;
} & PropsWithChildren;

export default function ShopCartSwitch({
  business,
  children,
}: ShopCartSwitchProps) {
  const changeBusiness = useShopCart((state) => state.changeBusiness);
  useEffect(() => {
    business && changeBusiness(business.id);
  }, [business.id]);
  return children;
}
