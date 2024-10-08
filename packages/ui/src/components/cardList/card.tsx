"use client";

import { CardContent, Card } from "@repo/ui/components/ui/card";
import Link from "next/link";
import { CheckIcon } from "@repo/ui/components/icons";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import { ProductShopCartItem } from "@repo/model/repository/order";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import { startTransition, useOptimistic } from "react";

type CardItemProps = {
  item: ProductShopCartItem;
  baseUrl?: string;
  onAdd?: () => void;
};

export function CardItem({
  item: originalItem,
  baseUrl,
  onAdd,
}: CardItemProps) {
  const [item, setItem] = useOptimistic(originalItem);
  const handleAdd = () => {
    startTransition(() => {
      setItem({ ...item, _inCart: true });
      return onAdd?.();
    });
  };
  return (
    <Card className="mb-4">
      <div>
        <Link href={`${baseUrl}/${item.slug}`} prefetch={false}>
          <Image
            src={item.image}
            alt={item.name}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>
      <CardContent className="p-4">
        {!!item.name && (
          <Link href={`${baseUrl}/${item.slug}`} prefetch={false}>
            <h3 className="text-lg font-medium">{item.name}</h3>
          </Link>
        )}
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">
            <PriceDisplay
              price={item.price}
              offerPrice={item.offerPrice as number}
            />
          </span>
          <div className="relative">
            {item._inCart && (
              <div className="absolute left-7 -top-2  bg-green-600 rounded-full p-1 h-5 w-5 mr-2">
                <CheckIcon className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            )}
            <BtnAddCart action={handleAdd} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
