"use client";

import { CompleteUser } from "@repo/model/zod/user";
import EntitySelect from "@repo/ui/components/entity-select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import { useTranslations } from "next-intl";
import React from "react";
import TelegramBusiness from "./telegram-business";
import { PlanSelect } from "@repo/ui/components/plan-select";

export type BusinessAdminFormProps = {
  form: any;
  showTelegram: boolean;
  users?: CompleteUser[];
  setShowTelegram: (value: boolean) => void;
};

export default function BusinessAdminForm({
  form,
  showTelegram,
  users,
  setShowTelegram,
}: BusinessAdminFormProps) {
  const t = useTranslations("Business");
  return (
    <>
      <FormField
        control={form.control}
        name="active"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbActive")}</FormLabel>
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
        name="plan"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbPlan")}</FormLabel>
            <FormControl>
              <PlanSelect
                {...field}
                onCheckedChange={field.onChange}
                placeholder={t("phPlan")}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="slug"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbSlug")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phSlug")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="userId"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbUserId")}</FormLabel>
            <FormControl>
              <EntitySelect
                {...field}
                items={users?.map((b) => ({
                  ...b,
                  name: `${b.name} (${b.email})`,
                }))}
                placeholder={t("phUserId")}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sendOrderToWhatsapp"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbSendOrderToWhatsapp")}</FormLabel>
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
      <div>
        <h3>
          {t("lbTelegram")}
          <input
            className="ml-2"
            type="checkbox"
            onChange={() => setShowTelegram(!showTelegram)}
            checked={showTelegram}
          />
        </h3>
        {showTelegram && <TelegramBusiness form={form} />}
      </div>
    </>
  );
}
