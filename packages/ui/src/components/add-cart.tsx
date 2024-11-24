"use client";

import { IProduct } from "@repo/model/types/product";
import { ShoppingCartIcon } from "./icons";
import { Button } from "./ui/button";
import { CheckIcon } from "./icons";
import { useCallback } from "react";
import { cn } from "../lib/utils";

export function BtnAddCart({
  product,
  action,
}: {
  product: IProduct;
  action?: () => any;
}) {
  const handle = useCallback(() => {
    action?.();
  }, [product, action]);
  return (
    <div className="relative">
      {product._inCart && (
        <div className="absolute left-7 -top-2  bg-green-600 rounded-full p-1 h-5 w-5 mr-2">
          <CheckIcon className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
      )}
      <Button
        disabled={product._outOfStock}
        className={cn("px-3")}
        onClick={handle}
      >
        <ShoppingCartIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
