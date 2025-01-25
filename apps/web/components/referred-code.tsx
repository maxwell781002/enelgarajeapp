"use client";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ReferredCode = ({ children }: { children: React.ReactNode }) => {
  const setReferredCode = useShopCart.use.setReferredCode();
  const searchParams = useSearchParams();
  const referredCode = searchParams.get("rc");
  useEffect(() => {
    if (!referredCode) return;
    setReferredCode(referredCode);
  }, [referredCode]);
  return children;
};
