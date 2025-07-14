import Commissions, {
  CommissionsProps,
} from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";
import { commissionCalculate } from "@repo/model/lib/utils";
import { useState } from "react";

export type PriceProps = {
  form: any;
} & Omit<CommissionsProps, "basePrice">;

export default function Price({ form, ...props }: PriceProps) {
  const price = form.watch("price");
  const offerPrice = form.watch("offerPrice");
  const basePrice = offerPrice && offerPrice < price ? offerPrice : price;
  const [businessProfitSwitch, setBusinessProfitSwitch] = useState(false);
  const [customBusinessProfit, setCustomBusinessProfit] = useState(0);
  const [commission, businessProfit] = commissionCalculate(
    basePrice,
    form.watch("priceValues.commissionType"),
    form.watch("priceValues.commissionValue"),
  );
  const showCommission = form.watch("priceValues.hasCommission");
  return (
    <>
      <PriceWidget
        form={form}
        showCommission={showCommission}
        changeBusinessProfit={setBusinessProfitSwitch}
        showBusinessProfit={businessProfitSwitch}
        customBusinessProfit={customBusinessProfit}
        setCustomBusinessProfit={setCustomBusinessProfit}
      />
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
