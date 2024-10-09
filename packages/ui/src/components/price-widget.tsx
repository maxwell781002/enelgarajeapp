"use client";

import PriceDisplay from "./price";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";

export default function PriceWidget({ form }: { form: any }) {
  const t = useTranslations("Product");
  return (
    <>
      <div className="flex flex-1 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbPrice")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phPrice")}
                  type="number"
                  {...field}
                  onChange={(event: any) => field.onChange(+event.target.value)}
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
                <Input
                  placeholder={t("phOfferPrice")}
                  type="number"
                  {...field}
                  onChange={(event: any) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <PriceDisplay
        price={form.watch("price")}
        offerPrice={form.watch("offerPrice")}
      />
    </>
  );
}
