"use client";

import { ShoppingCartIcon } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
import { IProduct } from "@repo/model/types/product";
import { useAddProductToCart, useShopCart } from "@repo/ui/stores/shop-cart";
import { PropsWithChildren, useTransition } from "react";

export function BtnAddCart({
  product,
  children,
  className = "",
  onAdd,
}: {
  product: IProduct;
  outOfStock: boolean;
  className?: string;
  onAdd: () => Promise<void>;
} & PropsWithChildren) {
  const [loading, startLoading] = useTransition();
  const addProductToCart = useAddProductToCart();
  const _changeBusiness = useShopCart.use.changeBusiness();
  const addProductToOrder = () => {
    startLoading(async () => {
      _changeBusiness(product.businessId);
      addProductToCart(product);
      return onAdd();
    });
  };

  return (
    <Button
      disabled={loading}
      className={cn("px-3 flex items-center gap-2", className)}
      onClick={addProductToOrder}
    >
      <ShoppingCartIcon className="w-4 h-4" />
      {children}
    </Button>
  );
}
