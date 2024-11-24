"use client";

import { MinusIcon, PlusIcon, Trash2Icon } from "@repo/ui/components/icons";
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent } from "@repo/ui/components/ui/card";
import { BtnConfirm } from "@repo/ui/components/ui/btn-confirm";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "@repo/ui/components/image";
import PriceDisplay from "@repo/ui/components/price";
import AlertMessage from "@repo/ui/components/alert-message";
import { ShopCartItem } from "@repo/model/types/shop-cart";

type Props = {
  item: ShopCartItem;
  url: string;
  onRemove: () => void;
  add: () => void;
  sub: () => void;
};

export default function CardItem({ item, onRemove, add, sub, url }: Props) {
  const t = useTranslations("ShopCart");

  return (
    <>
      <Card key={item.productId}>
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
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => sub()}>
                  <MinusIcon className="h-4 w-4" />
                </Button>
                <div>{item.quantity}</div>
                <Button variant="outline" size="icon" onClick={() => add()}>
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <PriceDisplay price={item.total} />
              </div>
              <BtnConfirm
                btnIcon={<Trash2Icon className="h-4 w-4 text-red-600" />}
                title={t("remove_dialog.title")}
                description={t("remove_dialog.description")}
                action={() => onRemove()}
                btnCancelText={t("remove_dialog.cancel")}
                btnContinueText={t("remove_dialog.continue")}
              />
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
