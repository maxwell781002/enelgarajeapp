"use client";

import { TCurrency } from "@repo/model/types/enums";
import PriceDisplay from "./price";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import PriceInput from "@repo/ui/components/price-input";
import { useTranslations } from "next-intl";


export default function PriceWidget({
  form,
  currency,
}: {
  form: any;
  currency?: TCurrency;
}) {
  const t = useTranslations("Product");

  const handleQuantityPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = +event.target.value;
    if (newPrice < 0) {
      return;
    }
      form.setValue("price", newPrice);
  };
    const handleQuantityPriceOffer = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPrice = +event.target.value;
        if (newPrice < 0) {
            return;
        }
        form.setValue("offerPrice", newPrice);
    };
  return (
    <>
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
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
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
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        {/*<PriceDisplay
          price={form.watch("price")}
          offerPrice={form.watch("offerPrice")}
          currency={currency}
        />*/}
      </div>
    </>
  );
}
