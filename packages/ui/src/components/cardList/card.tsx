"use client";

import { CardContent, Card } from "@repo/ui/components/ui/card";
import Link from "next/link";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/prices/price";
import ProductBadge from "@repo/ui/components/product-badge";
import { IProduct } from "@repo/model/types/product";
import { useTranslations } from "next-intl";

type CardItemProps = {
  item: IProduct;
  baseUrl?: string;
  showStock?: boolean;
  showCommission?: boolean;
};

export function CardItem({
  item,
  baseUrl,
  showStock,
  showCommission,
}: CardItemProps) {
  const t = useTranslations("Product");

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
          <BtnAddCart product={item} outOfStock={item._outOfStock} />
        </div>
        <ProductBadge product={item} className="mt-2" />
        <div className="flex flex-1 justify-between text-blue-500">
          {showStock && (
            <div className="mt-2">
              <span className="font-semibold">{t("stock")}: </span>
              <span>{item.stock}</span>
            </div>
          )}
          {showCommission && (
            <div className="mt-2 flex">
              <span className="font-semibold mr-2 ">{t("commission")}: </span>
              <PriceDisplay price={item._commission} classNameText="text-sm" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
