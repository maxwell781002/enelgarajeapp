"use client";

import { ShoppingCartIcon } from "./icons";
import { Button } from "./ui/button";
import { CheckIcon } from "./icons";
import { cn } from "../lib/utils";

export function BtnAddCart({
  inCart,
  outOfStock,
  action,
}: {
  inCart: boolean;
  outOfStock: boolean;
  action?: () => any;
}) {
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
        onClick={() => action?.()}
      >
        <ShoppingCartIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
