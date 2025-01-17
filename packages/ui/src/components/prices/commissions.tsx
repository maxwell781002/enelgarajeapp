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
import PriceDisplay from "./price";
import { commissionCalculate } from "@repo/model/lib/utils";
import { cn } from "@repo/ui/lib/utils";
import PriceInput from "@repo/ui/components/price-input";

export type CommissionsProps = {
  form: any;
  basePrice: number;
  currency?: TCurrency;
};

function PriceShow({
  price = 0,
  currency,
  label,
}: {
  price: number | undefined;
  currency?: TCurrency;
  label: string;
}) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <PriceDisplay
        price={price}
        currency={currency}
        classNameText={cn(
          "text-lg font-bold",
          price && price <= 0 && "text-red-600",
        )}
      />
    </div>
  );
}

export default function Commissions({
  form,
  basePrice,
  currency,
}: CommissionsProps) {
  const t = useTranslations("Product");
  const show = form.watch("priceValues.hasCommission");
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
  const [value, base] = commissionCalculate(
    basePrice,
    form.watch("priceValues.commissionType"),
    form.watch("priceValues.commissionValue"),
  );

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
      {show && (
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
              price={value}
              currency={currency}
              label={t("lbCommissionDisplay")}
            />
            <PriceShow
              price={base}
              currency={currency}
              label={t("lbBusinessProfit")}
            />
          </div>
        </>
      )}
    </div>
  );
}
