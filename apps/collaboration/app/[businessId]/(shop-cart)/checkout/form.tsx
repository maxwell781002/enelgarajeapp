"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CollaboratorShoppingCartSchema,
  TCollaboratorShoppingCartSchema,
} from "@repo/model/validation/user";
import { CompleteBusiness } from "@repo/model/zod/business";
import AddressForm from "@repo/ui/components/address/form";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/index";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Switch } from "@repo/ui/components/ui/switch";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomerForm from "./customer";
import TicketForm from "./ticket";

export type CheckoutFormProps = {
  action: (data: any) => Promise<any>;
  business: CompleteBusiness;
  defaultValues: TCollaboratorShoppingCartSchema;
};

export default function CheckoutForm({
  action,
  business,
  defaultValues,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  const form = useForm<TCollaboratorShoppingCartSchema>({
    resolver: zodResolver(CollaboratorShoppingCartSchema),
    defaultValues,
  });
  const wantDomicile = form.watch("wantDomicile");
  useEffect(() => {
    if (!wantDomicile) {
      form.resetField("address");
    }
  }, [wantDomicile]);

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <CheckoutPage
        action={action}
        form={form}
        addressName="address"
        business={business}
        successfulUrl={`/${business.id}/checkout-successful?orderId=`}
        render={({ neighborhoods, wantDomicile, neighborhoodLoading }) => (
          <>
            <h3 className="text-lg font-semibold">{t("customer")}</h3>
            <CustomerForm form={form} t={t} />
            <FormField
              control={form.control}
              name="wantDomicile"
              render={({ field, fieldState: { error } }: any) => (
                <FormItem>
                  <FormLabel>{t("lbWantDomicile")}</FormLabel>
                  <FormControl>
                    <Switch
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {!!error?.message && t(error?.message)}
                  </FormMessage>
                </FormItem>
              )}
            />
            {wantDomicile && (
              <AddressForm
                form={form}
                neighborhoods={neighborhoods}
                neighborhoodLoading={neighborhoodLoading}
                addAlias={false}
                addName={false}
                name="address"
              />
            )}
            <h3 className="text-lg font-semibold">{t("ticket")}</h3>
            <TicketForm form={form} t={t} business={business} />
          </>
        )}
      />
    </Form>
  );
}
