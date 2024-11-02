"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import { CompletePaymentMethod } from "@repo/model/zod/paymentmethod";
import { SelectWidget } from "@repo/ui/components/select";
import {
  getValidation,
  PaymentMethodType,
} from "@repo/model/validation/payment-method";
import { useEffect, useMemo, useState } from "react";
import { ComponentByType } from "./formt-types";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompletePaymentMethod;
};

export default function PaymentMethodForm({
  action,
  defaultValues,
}: FormAction) {
  const t = useTranslations("PaymentMethod");
  const [resolver, setResolver] = useState(getValidation());
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver: zodResolver(resolver),
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("updated") : t("created"),
      }),
  });
  const paymentMethodTypeItems = Object.entries(PaymentMethodType).map(
    ([label, value]) => ({ label, value }),
  );
  const type = form.watch("type");
  useEffect(() => {
    setResolver(getValidation(type));
    const { data } = defaultValues.type === type ? defaultValues : { data: {} };
    form.setValue("data", data);
  }, [type, form, defaultValues]);
  const PaymentMethodComponent = useMemo(
    () => (type ? ComponentByType[type as PaymentMethodType] : null),
    [type],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lblName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phName")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({
            field: { ref, ...field },
            fieldState: { error },
          }: any) => (
            <FormItem>
              <FormLabel>{t("lbType")}</FormLabel>
              <FormControl>
                <SelectWidget
                  placeholder={t("phType")}
                  {...field}
                  items={paymentMethodTypeItems}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        {PaymentMethodComponent && (
          <>
            <h3 className="font-bold">{t(`titles.${type}`)}</h3>
            <FormField
              control={form.control}
              name="data"
              render={({
                field: { ref, ...field },
                fieldState: { error },
              }: any) => (
                <FormItem>
                  <FormControl>
                    <PaymentMethodComponent
                      placeholder={t("phName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {!!error?.message && t(error?.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
