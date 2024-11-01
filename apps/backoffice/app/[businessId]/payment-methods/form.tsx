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
import {
  CompletePaymentMethod,
  PaymentMethodModel,
} from "@repo/model/zod/paymentmethod";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompletePaymentMethod;
};

const resolver = zodResolver(PaymentMethodModel.omit({ id: true }));

export default function PaymentMethodForm({
  action,
  defaultValues,
}: FormAction) {
  const t = useTranslations("PaymentMethod");
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("updated") : t("created"),
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
              <FormLabel>{t("lblName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phName")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
