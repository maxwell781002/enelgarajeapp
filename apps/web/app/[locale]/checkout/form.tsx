"use client";

import {
  AddressType,
  addressValidation,
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
import { useEffect, useMemo, useState } from "react";

type CheckoutFormProps = {
  action: (state: TUserRegisterSchema) => Promise<any>;
  defaultValues?: TUserRegisterSchema;
  business: CompleteBusiness;
  address: CompleteAddress[];
};

export function CheckoutForm({
  action,
  defaultValues,
  business,
  address,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  const [addressType, setAddressType] = useState(AddressType.selectAddress);
  const schema = useMemo(
    () => UserRegisterSchema.extend({ ...addressValidation[addressType] }),
    [addressType],
  );
  const { formState, ...form } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  useEffect(() => {
    form.setValue("addressType", String(addressType));
  }, [addressType, form]);

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
          <Address
            form={form}
            addresses={address}
            setAddressType={setAddressType}
          />
        )}
        <Button type="submit" disabled={formState.isSubmitting}>
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
