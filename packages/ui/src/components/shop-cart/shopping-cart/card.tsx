"use client";

import { Trash2Icon } from "@repo/ui/components/icons";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { BtnConfirm } from "@repo/ui/components/ui/btn-confirm";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import AlertMessage from "@repo/ui/components/alert-message";
import { ShopCartItem } from "@repo/model/types/shop-cart";
import QuantitySetter from "./set-quantity";
import { QuantitySetterProps } from "./set-quantity.js";
import { useTransition } from "react";

export type CardItemProps = {
  item: ShopCartItem;
  url: string;
  onRemove: () => void;
} & QuantitySetterProps;

export default function CardItem({
  item,
  onRemove,
  url,
  ...quantityProps
}: CardItemProps) {
  const t = useTranslations("ShopCart");
  const [removeLoading, startRemoving] = useTransition();
  const handleRemove = () => {
    return startRemoving(() => onRemove());
  };
  return (
    <>
      <Card key={item.productId}>
        <div className="flex justify-end p-2">
          <div className="absolute">
            <BtnConfirm
              btnIcon={<Trash2Icon className="h-4 w-4 text-red-600" />}
              title={t("remove_dialog.title")}
              description={t("remove_dialog.description")}
              action={handleRemove}
              btnCancelText={t("remove_dialog.cancel")}
              btnContinueText={t("remove_dialog.continue")}
              btnAttr={{ loading: removeLoading }}
            />
          </div>
        </div>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="h-[64px] w-[64px] flex items-center justify-center">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <Link href={`${url}/${item.product.slug}`} prefetch={false}>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <PriceDisplay
                    offerPrice={item.product.offerPrice as number}
                    price={item.product.price}
                    classNameText="text-sm"
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <QuantitySetter quantity={item.quantity} {...quantityProps} />
              </div>
              <div className="flex flex-1 justify-end">
                <PriceDisplay price={item.total} />
              </div>
            </div>
            {item.outOfStock && (
              <AlertMessage
                variant="destructive"
                text={t("errors.item_out_of_stock")}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
