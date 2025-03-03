"use client";

import { Currency } from "@repo/model/types/enums";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import EntitySelect from "@repo/ui/components/entity-select";
import { SelectWidget } from "@repo/ui/components/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import Editor from "@repo/ui/components/rich-text/editor";
import { useTranslations } from "next-intl";
import React from "react";

export type BusinessFormProps = {
  form: any;
  paymentMethods?: CompletePaymentMethod[];
};

export default function BusinessForm({
  form,
  paymentMethods = [],
}: BusinessFormProps) {
  const t = useTranslations("Business");
  const currencyItems = Object.entries(Currency).map(([label, value]) => ({
    label,
    value,
  }));
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbName")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phName")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbPhone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phPhone")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="defaultPaymentMethodId"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbPaymentMethod")}</FormLabel>
              <FormControl>
                <EntitySelect
                  items={[{ name: "Ninguno", id: null }, ...paymentMethods]}
                  placeholder={t("phPaymentMethod")}
                  className="bg-withe"
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCurrency")}</FormLabel>
              <FormControl>
                <SelectWidget
                  placeholder={t("phCurrency")}
                  {...field}
                  items={currencyItems}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="requestAddress"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbRequestAddress")}</FormLabel>
            <FormControl>
              <Switch
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbDescription")}</FormLabel>
            <FormControl>
              <Editor placeholder={t("phDescription")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ticketTermsConditions"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbTicketTermsConditions")}</FormLabel>
            <FormControl>
              <Editor placeholder={t("phTicketTermsConditions")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
