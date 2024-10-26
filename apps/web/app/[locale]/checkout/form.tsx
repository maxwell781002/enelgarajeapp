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
import Address from "@repo/ui/components/address/index";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteAddress } from "@repo/model/zod/address";

type CheckoutFormProps = {
  action: (state: TUserRegisterSchema) => Promise<any>;
  defaultValues?: TUserRegisterSchema;
  business: CompleteBusiness;
};

const defaultAddresses: CompleteAddress[] = [
  {
    id: "1",
    alias: "Home",
    name: "Peter Parker",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    reference: "12345",
  },
  {
    id: "2",
    alias: "Work",
    name: "Bruce Wayne",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    reference: "12345",
  },
  {
    id: "3",
    alias: "Other",
    name: "Clark Kent",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    reference: "12345",
  },
];

export function CheckoutForm({
  action,
  defaultValues,
  business,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");

  const { formState, ...form } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues,
  });

  return (
    <Form {...form} formState={formState}>
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
                <Input {...field} value={field.value as string} />
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
              <FormDescription>{t("phPhone")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {business.requestAddress && (
          <Address form={form} name="address" addresses={defaultAddresses} />
        )}
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
