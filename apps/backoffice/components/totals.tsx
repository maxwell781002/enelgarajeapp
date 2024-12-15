import CardTotal from "@repo/ui/components/cardTotal";
import { Package, ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";

export type TotalsProps = {
  productTotal: number;
  productInactive: number;
  orderToProcess: number;
  orderPayed: number;
  orderReject: number;
};

export default async function Totals({
  productTotal,
  productInactive,
  orderToProcess,
  orderPayed,
  orderReject,
}: TotalsProps) {
  const t = await getTranslations("Totals");
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardTotal
        title={t("totalProducts")}
        Icon={Package}
        value={productTotal}
        subText={`+ ${productInactive} ${t("totalProductsInactive")}`}
      />
      <CardTotal
        title={t("orderToProcess")}
        Icon={ShoppingCart}
        value={orderToProcess}
      />
      <CardTotal
        title={t("orderPayed")}
        Icon={ShoppingCart}
        value={orderPayed}
      />
      <CardTotal
        title={t("orderReject")}
        Icon={ShoppingCart}
        value={orderReject}
      />
    </div>
  );
}
