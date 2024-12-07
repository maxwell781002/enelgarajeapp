import Commissions from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";

export type PriceProps = {
  form: any;
};

export default function Price({ form }: PriceProps) {
  const price = form.watch("price");
  const offerPrice = form.watch("offerPrice");
  const basePrice = offerPrice && offerPrice < price ? offerPrice : price;
  return (
    <>
      <PriceWidget form={form} />
      <Commissions form={form} basePrice={basePrice} />
    </>
  );
}
