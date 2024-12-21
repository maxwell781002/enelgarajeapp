"use client";

import { ShoppingCartIcon } from "./icons";
import { Button } from "./ui/button";
import { CheckIcon } from "./icons";
import { cn } from "../lib/utils";
import { useStore } from "@repo/ui/stores/index";
import { IProduct } from "@repo/model/types/product";
import { useShopCart } from "@repo/ui/stores/shop-cart";

export function BtnAddCart({
  product,
  outOfStock,
}: {
  product: IProduct;
  outOfStock: boolean;
}) {
  const inCart = useStore(useShopCart, (state) => state.inCart(product.id));
  const addProductToOrder = useShopCart.use.add();

  return (
    <div className="relative">
      {inCart && (
        <div className="absolute left-7 -top-2  bg-green-600 rounded-full p-1 h-5 w-5 mr-2">
          <CheckIcon className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      <Button
        disabled={outOfStock}
        className={cn("px-3")}
        onClick={() => addProductToOrder(product)}
      >
        <ShoppingCartIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
