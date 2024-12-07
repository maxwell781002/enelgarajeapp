import { CommissionTypes, TCurrency } from "@repo/model/types/enums";
import { Switch } from "@repo/ui/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useTranslations } from "next-intl";
import { SelectWidget } from "../select";
import { Input } from "../ui/input";
import PriceDisplay from "./price";

export type CommissionsType = {
  form: any;
  basePrice: number;
  currency?: TCurrency;
};

export default function Commissions({
  form,
  basePrice,
  currency,
}: CommissionsType) {
  console.log(basePrice);
  const t = useTranslations("Product");
  const commission = 4000;
  return (
    <>
      <div className="flex items-center gap-2 pt-5 pb-5">
        <FormLabel>{t("hasCommissions")}</FormLabel>
        <Switch />
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <FormField
          control={form.control}
          name="productPrices.commissionType"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCommissionType")}</FormLabel>
              <FormControl>
                <SelectWidget
                  {...field}
                  items={Object.entries(CommissionTypes).map(
                    ([label, value]) => ({
                      label: t(label),
                      value,
                    }),
                  )}
                  onValueChange={field.onChange}
                  placeholder={t("phCommissionType")}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productPrices.commissionValue"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCommissionValue")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phCommissionValue")}
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <PriceDisplay price={commission} currency={currency} />
      </div>
    </>
  );
}
