"use client";

import { ShopCartItem } from "@repo/model/types/shop-cart";
import BaseCardItem, {
  CardItemProps,
} from "@repo/ui/components/shop-cart/shopping-cart/card";
import { Input } from "@repo/ui/components/ui/input";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useTranslations } from "next-intl";
import { useState } from "react";

const CustomPrice = ({ item }: { item: ShopCartItem }) => {
  const t = useTranslations("ShopCart");
  const [value, setValue] = useState(item.customPrice);
  const setCustomPrice = useShopCart((state) => state.setCustomPrice);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = parseInt(event.target.value, 10);
    if (newPrice < 0) {
      return;
    }
    setCustomPrice(item.productId, newPrice);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="">{t("custom_price")}:</label>
      <Input
        type="number"
        className="w-32"
        onBlur={handleQuantityChange}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(+e.target.value)
        }
      />
      <span className="text-muted-foreground text-sm">
        {t("custom_price_help")}
      </span>
    </div>
  );
};

export default function CardItem({ item, ...props }: CardItemProps) {
  return (
    <BaseCardItem item={item} {...props}>
      <CustomPrice item={item} />
    </BaseCardItem>
  );
}
