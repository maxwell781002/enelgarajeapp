import PriceDisplay from "@repo/ui/components/prices/price";
import { Separator } from "@repo/ui/components/ui/separator";
import { useTranslations } from "next-intl";

export type TotalProps = {
  subtotal: number;
  shippingPrice: number;
  total: number;
  wantDomicile: boolean;
};

export default function Total({
  subtotal,
  shippingPrice,
  total,
  wantDomicile,
}: TotalProps) {
  const t = useTranslations("Checkout");
  return (
    <div className="w-full space-y-2">
      {!!shippingPrice && wantDomicile && (
        <>
          <div className="flex justify-between">
            <span>{t("subtotal")}:</span>
            <span>
              <PriceDisplay price={subtotal} />
            </span>
          </div>
          <div className="flex justify-between">
            <span>{t("shipping_price_cart")}:</span>
            <span>
              <PriceDisplay price={shippingPrice} />
            </span>
          </div>
          <Separator />
        </>
      )}
      <div className="flex justify-between font-semibold">
        <span>{t("total_cart")}:</span>
        <span>
          <PriceDisplay price={total} />
        </span>
      </div>
    </div>
  );
}
