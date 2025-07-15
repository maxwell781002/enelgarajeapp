import Commissions, {
  CommissionsProps,
} from "@repo/ui/components/prices/commissions";
import PriceWidget from "@repo/ui/components/prices/price-widget";
import {
  calculateBaseBusinessProfit,
  commissionCalculate,
} from "@repo/model/lib/utils";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    if (customBusinessProfit === 0) {
      return;
    }
    const { price, offerPrice } = calculateBaseBusinessProfit(
      form.watch("priceValues.commissionType"),
      form.watch("priceValues.commissionValue"),
      customBusinessProfit,
    );
    form.setValue("price", price);
    form.setValue("offerPrice", offerPrice);
  }, [
    customBusinessProfit,
    form.watch("priceValues.commissionType"),
    form.watch("priceValues.commissionValue"),
  ]);
  useEffect(() => {
    if (businessProfitSwitch) {
      setCustomBusinessProfit(0);
    }
  }, [businessProfitSwitch]);
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
        offerPrice={offerPrice}
        {...props}
        showCommission={showCommission}
        commission={commission}
        businessProfit={businessProfit}
      />
    </>
  );
}
