"use client";

import { useOptimistic } from "react";
import { CardContent, Card } from "@repo/ui/components/ui/card";
import Link from "next/link";
import { CheckIcon } from "@repo/ui/components/icons";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import { ProductShopCartItem } from "@repo/model/repository/order";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";

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
  const handleAdd = async () => {
    setItem({ ...item, _inCart: true });
    await onAdd?.();
  };

  return (
    <Card>
      <div className="relative">
        {item._inCart && (
          <div className="absolute top-2 left-2 bg-red-600 rounded-full p-1">
            <CheckIcon className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
        <Link href={`${baseUrl}/${item.slug}`} prefetch={false}>
          <Image
            src={item.image}
            width={300}
            height={300}
            alt={item.name}
            className="rounded-t-lg object-cover w-full h-48"
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
          <BtnAddCart action={handleAdd} />
        </div>
      </CardContent>
    </Card>
  );
}
