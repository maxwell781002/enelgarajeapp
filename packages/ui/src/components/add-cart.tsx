"use client";
import { ShoppingCartIcon } from "./icons";
import { Button } from "./ui/button";

export function BtnAddCart({ action }: { action?: () => any }) {
  return (
    <Button onClick={() => action?.()} className="px-3">
      <ShoppingCartIcon className="w-4 h-4" />
    </Button>
  );
}
