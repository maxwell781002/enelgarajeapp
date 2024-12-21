"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "../icons";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useStore } from "@repo/ui/stores/index";

export default function ShoppingCartHeader({
  className,
  url = "/shopping-cart",
}: {
  className?: string;
  url?: string;
}) {
  const numberOfItems = useStore(useShopCart, (state) => state.numberOfItems());
  return (
    <div className={className}>
      <Link href={url} className="flex items-center gap-2" prefetch={false}>
        <ShoppingCartIcon className="w-6 h-6" />
        <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-xs font-medium">
          {numberOfItems}
        </span>
      </Link>
    </div>
  );
}
