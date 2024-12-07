import Commissions from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";
import { useTranslations } from "next-intl";

export type PriceProps = {
  form: any;
};

export default function Price({ form }: PriceProps) {
  const t = useTranslations("Product");
  const price = form.watch("price");
  const offerPrice = form.watch("offerPrice");
  const basePrice = price < offerPrice ? price : offerPrice;
  return (
    <>
      <PriceWidget form={form} />
      <Commissions form={form} basePrice={basePrice} />
    </>
  );
}
