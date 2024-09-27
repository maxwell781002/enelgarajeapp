"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessValidation } from "@repo/model/validation/business";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteUser } from "@repo/model/zod/user";
import EntitySelect from "@repo/ui/components/entity-select";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import React from "react";

const resolver = zodResolver(BusinessValidation);

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteBusiness;
  users?: CompleteUser[];
  isAdmin?: boolean;
};

export default function BusinessForm({
  action,
  defaultValues,
  users,
  isAdmin = false,
}: FormAction) {
  const { toast } = useToast();
  const t = useTranslations("Business");
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("businessUpdated") : t("businessCreated"),
      }),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        {isAdmin && (
          <FormField
            control={form.control}
            name="slug"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbSlug")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("phSlug")} {...field} />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        )}
        {isAdmin && (
          <FormField
            control={form.control}
            name="userId"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbUserId")}</FormLabel>
                <FormControl>
                  <EntitySelect
                    {...field}
                    items={users}
                    placeholder={t("phUserId")}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        )}
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
