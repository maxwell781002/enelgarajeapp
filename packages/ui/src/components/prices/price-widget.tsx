"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import PriceInput from "@repo/ui/components/price-input";
import { useTranslations } from "next-intl";
import { Switch } from "../ui/switch";

export default function PriceWidget({
  form,
  showCommission,
  showBusinessProfit,
  changeBusinessProfit,
  customBusinessProfit,
  setCustomBusinessProfit,
}: {
  form: any;
  showCommission: boolean;
  showBusinessProfit: boolean;
  changeBusinessProfit: (value: boolean) => void;
  customBusinessProfit: number;
  setCustomBusinessProfit: (value: number) => void;
}) {
  const t = useTranslations("Product");

  const handleQuantityPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPrice = +event.target.value;
    if (newPrice < 0) {
      return;
    }
    form.setValue("price", newPrice);
  };
  const handleQuantityPriceOffer = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPrice = +event.target.value;
    if (newPrice < 0) {
      return;
    }
    form.setValue("offerPrice", newPrice);
  };
  return (
    <div>
      {showCommission && (
        <div className="flex gap-2">
          <strong>{t("ConfigureBusinessProfitSwitch")}</strong>
          <Switch onCheckedChange={changeBusinessProfit} />
        </div>
      )}
      {showBusinessProfit ? (
        <>
          <FormLabel>{t("lbBusinessProfit")}</FormLabel>
          <PriceInput
            onBlur={(e) => setCustomBusinessProfit(+e.target.value)}
            value={customBusinessProfit}
          />
        </>
      ) : (
        <div className="grid gap-4 grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbPrice")}</FormLabel>
                <FormControl>
                  <PriceInput
                    onBlur={handleQuantityPriceChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="offerPrice"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbOfferPrice")}</FormLabel>
                <FormControl>
                  <PriceInput
                    onBlur={handleQuantityPriceOffer}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
}
