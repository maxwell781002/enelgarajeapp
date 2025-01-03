"use client";

import { ShopCartItem } from "@repo/model/types/shop-cart";
import PriceInput from "@repo/ui/components/price-input";
import BaseCardItem, {
  CardItemProps,
} from "@repo/ui/components/shop-cart/shopping-cart/card";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useTranslations } from "next-intl";

const CustomPrice = ({ item }: { item: ShopCartItem }) => {
  const t = useTranslations("ShopCart");
  const setCustomPrice = useShopCart((state) => state.setCustomPrice);
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    if (newPrice < 0) {
      return;
    }
    setCustomPrice(item.productId, newPrice);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="">{t("custom_price")}:</label>
      <PriceInput
        className="w-32"
        onBlur={handleQuantityChange}
        value={item.customPrice}
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
