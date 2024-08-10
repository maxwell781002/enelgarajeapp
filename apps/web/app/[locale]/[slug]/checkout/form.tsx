"use client";

import {
  TUserRegisterSchema,
  UserRegisterSchema,
} from "@repo/model/validation/user";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type CheckoutFormProps = {
  action: (state: TUserRegisterSchema) => Promise<any>;
  defaultValues?: TUserRegisterSchema;
};

export function CheckoutForm({ action, defaultValues }: CheckoutFormProps) {
  const t = useTranslations("Checkout");

  const { formState, ...form } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          action({ ...defaultValues, ...data }),
        )}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lblName")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("phName")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lbPhone")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("phName")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
