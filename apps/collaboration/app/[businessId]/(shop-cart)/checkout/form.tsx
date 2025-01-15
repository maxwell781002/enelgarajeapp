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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomerForm from "./customer";
import TicketForm from "./ticket";
import Markdown from "@repo/ui/components/markdown";
import Link from "next/link";

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
  const [openTerms, setOpenTerms] = useState(false);
  const handleTermAndCondition = () => setOpenTerms((prev) => !prev);

  return (
    <Form {...form}>
      <CheckoutPage
        action={action}
        form={form}
        addressName="address"
        business={business}
        successfulUrl={`/${business.id}/checkout-successful?orderId=`}
        render={({ neighborhoods, wantDomicile }) => (
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
                addAlias={false}
                addName={false}
                name="address"
              />
            )}
            <h3 className="text-lg font-semibold">{t("ticket")}</h3>
            <TicketForm form={form} t={t} />
            {business.ticketTermsConditions && (
              <>
                <strong
                  className="mt-2 block cursor-pointer text-blue-600 hover:text-blue-800 underline underline-offset-2 hover:underline-offset-4 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={handleTermAndCondition}
                >
                  {t("ticketTermsAndConditions")}
                </strong>
                {openTerms && (
                  <Markdown className="w-full">
                    {business.ticketTermsConditions}
                  </Markdown>
                )}
              </>
            )}
          </>
        )}
      />
    </Form>
  );
}
