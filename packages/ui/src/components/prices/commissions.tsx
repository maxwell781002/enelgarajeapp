import { CommissionTypes, TCurrency } from "@repo/model/types/enums";
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
import PriceInput from "@repo/ui/components/price-input";
import PriceShow from "./price-show";

export type CommissionsProps = {
  form: any;
  basePrice: number;
  currency?: TCurrency;
  showCommission: boolean;
  commission?: number;
  businessProfit?: number;
};

export default function Commissions({
  form,
  basePrice,
  currency,
  showCommission,
  commission = 0,
  businessProfit = 0,
}: CommissionsProps) {
  const t = useTranslations("Product");
  const selectOption = form.watch("priceValues.commissionType");
  const handleQuantityCommissionValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPrice = +event.target.value;
    if (newPrice < 0) {
      return;
    }
    form.setValue("priceValues.commissionValue", newPrice);
  };
  return (
    <div className="pt-5">
      <FormField
        control={form.control}
        name="priceValues.hasCommission"
        render={({
          field: { value, onChange, ...field },
          fieldState: { error },
        }: any) => (
          <FormItem>
            <FormLabel>{t("hasCommissions")}</FormLabel>
            <FormControl>
              <input
                {...field}
                checked={value}
                onChange={(e) => onChange(!!e.target.checked)}
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ml-5"
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      {showCommission && (
        <>
          <div className="grid gap-4 grid-cols-2">
            <FormField
              control={form.control}
              name="priceValues.commissionType"
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
                      onChange={field.onChange}
                      placeholder={t("phCommissionType")}
                    />
                  </FormControl>
                  <FormMessage>
                    {!!error?.message && t(error?.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
            {selectOption === CommissionTypes.FIXED && (
              <FormField
                control={form.control}
                name="priceValues.commissionValue"
                render={({ field, fieldState: { error } }: any) => (
                  <FormItem>
                    <FormLabel>{t("lbCommissionValue")}</FormLabel>
                    <FormControl>
                      <PriceInput
                        onBlur={handleQuantityCommissionValueChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage>
                      {!!error?.message && t(error?.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
            {selectOption === CommissionTypes.PERCENTAGE && (
              <FormField
                control={form.control}
                name="priceValues.commissionValue"
                render={({ field, fieldState: { error } }: any) => (
                  <FormItem>
                    <FormLabel>{t("lbCommissionValue")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t("phCommissionValue")}
                        type="number"
                        onChange={(event: any) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage>
                      {!!error?.message && t(error?.message)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            )}
            <PriceShow
              price={commission}
              currency={currency}
              label={t("lbCommissionDisplay")}
            />
            <PriceShow
              price={businessProfit}
              currency={currency}
              label={t("lbBusinessProfit")}
            />
            <PriceShow
              price={basePrice}
              currency={currency}
              label={t("lbFinalPrice")}
            />
            <PriceShow
              price={businessProfit}
              currency={currency}
              label={t("lbOfferPrice")}
            />
          </div>
        </>
      )}
    </div>
  );
}
