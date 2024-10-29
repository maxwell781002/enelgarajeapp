"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useTranslations } from "next-intl";
import React from "react";

export type BusinessFormAction = {
  form: any;
};

export default function BusinessForm({ form }: BusinessFormAction) {
  const t = useTranslations("Business");
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
              <Textarea placeholder={t("phDescription")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
