"use client";

import { CardContent, Card } from "@repo/ui/components/ui/card";
import Link from "next/link";
import { BtnAddCart } from "@repo/ui/components/add-cart";
import Image, { ImageProp } from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/prices/price";
import ProductBadge from "@repo/ui/components/product-badge";
import { IProduct } from "@repo/model/types/product";
import { useTranslations } from "next-intl";

type CardItemProps = {
  item: IProduct;
  baseUrl?: string;
  showStock?: boolean;
  showCommission?: boolean;
  showSku?: boolean;
  classNameCard?: string;
  imageProps?: ImageProp;
};

export function CardItem({
  item,
  baseUrl,
  showStock,
  showCommission,
  showSku,
  classNameCard,
  imageProps = {},
}: CardItemProps) {
  const t = useTranslations("Product");

  return (
    <Card className={`${classNameCard}`}>
      <div>
        <Link href={`${baseUrl}/${item.slug}`} prefetch={false}>
          <Image
            src={item.image}
            alt={item.name}
            width={312}
            height={269}
            className="w-[312px] h-[150px] md:h-[269px] object-cover border border-border"
            {...imageProps}
          />
        </Link>
      </div>
      <CardContent className="px-3 pb-1">
        <div className="flex justify-between items-center mb-2">
          {!!item.name && (
            <Link href={`${baseUrl}/${item.slug}`} prefetch={false}>
              <h3 className="text-lg font-medium">{item.name}</h3>
            </Link>
          )}
          <ProductBadge product={item} className="mt-2" />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold font-sans">
            <PriceDisplay
              price={item.price}
              offerPrice={item.offerPrice as number}
            />
          </span>
          <BtnAddCart product={item} outOfStock={item._outOfStock} />
        </div>
        <div className="flex flex-1 flex-col justify-between text-blue-500">
          {showStock && (
            <div className="mt-2">
              <span className="font-semibold">{t("stock")}: </span>
              <span>{item.stock}</span>
            </div>
          )}
          {showCommission && (
            <div className="flex">
              <span className="font-semibold mr-2 ">{t("commission")}: </span>
              <PriceDisplay price={item._commission} classNameText="text-sm" />
            </div>
          )}
          {showSku && (
            <div>
              <span className="font-semibold">SKU: </span>
              <span>{item.sku}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
