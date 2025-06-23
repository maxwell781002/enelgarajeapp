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
        {!!numberOfItems && (
          <>
            <span className="bg-accent text-accent-foreground rounded-full py-0.5 font-medium">
              {numberOfItems}
            </span>
            <span className="relative flex size-3 -ml-3 -mt-10">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
            </span>
          </>
        )}
      </Link>
    </div>
  );
}
