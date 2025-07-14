import Commissions, {
  CommissionsProps,
} from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";
import { commissionCalculate } from "@repo/model/lib/utils";

export type PriceProps = {
  form: any;
} & Omit<CommissionsProps, "basePrice">;

export default function Price({ form, ...props }: PriceProps) {
  const price = form.watch("price");
  const offerPrice = form.watch("offerPrice");
  const basePrice = offerPrice && offerPrice < price ? offerPrice : price;
  const [commission, businessProfit] = commissionCalculate(
    basePrice,
    form.watch("priceValues.commissionType"),
    form.watch("priceValues.commissionValue"),
  );
  const showCommission = form.watch("priceValues.hasCommission");
  return (
    <>
      <PriceWidget form={form} showCommission={showCommission} />
      <Commissions
        form={form}
        basePrice={basePrice}
        {...props}
        showCommission={showCommission}
        commission={commission}
        businessProfit={businessProfit}
      />
    </>
  );
}
