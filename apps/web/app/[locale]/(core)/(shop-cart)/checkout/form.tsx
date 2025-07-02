"use client";

import { useTranslations } from "next-intl";
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AddressType,
  WebShoppingCartSchema,
} from "@repo/model/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Address from "@repo/ui/components/address/index";
import { CompleteAddress } from "@repo/model/zod/address";
import { CompleteBusiness } from "@repo/model/zod/business";
import { Switch } from "@repo/ui/components/ui/switch";
import CheckoutPage from "@repo/ui/components/shop-cart/checkout/index";
import { useEffect } from "react";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useStore } from "@repo/ui/stores/index";

type TWebShoppingCartSchema = z.infer<typeof WebShoppingCartSchema>;

export type CheckoutFormProps = {
  action: (data: any) => Promise<any>;
  defaultValues: TWebShoppingCartSchema;
  addresses: CompleteAddress[];
  business: CompleteBusiness;
};

export default function CheckoutForm({
  action,
  defaultValues,
  addresses,
  business,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  const form = useForm<TWebShoppingCartSchema>({
    resolver: zodResolver(WebShoppingCartSchema),
    defaultValues,
  });
  const requestAddress = form.watch("businessRequestAddress");
  const wantDomicile = form.watch("wantDomicile");
  const addressType = form.watch("addressType") as AddressType;
  useEffect(() => {
    if (addressType === AddressType.selectAddress) {
      form.resetField(AddressType.newAddress);
    }
  }, [addressType]);
  const referredCode = useStore(useShopCart, (state) => state.referredCode());
  const handleAction = async (formData: any) => {
    formData.referredCode = referredCode;
    const data = await action(formData);
    return data;
  };

  console.log(form.formState.errors, form.getValues());

  return (
    <Form {...form}>
      <CheckoutPage
        action={handleAction}
        form={form}
        addressName={addressType}
        business={business}
        successfulUrl={(id: string) => `/checkout-successful/${id}`}
        render={({ neighborhoods, neighborhoodLoading }) => (
          <>
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
            {!!requestAddress && (
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
            )}
            {wantDomicile && (
              <Address
                form={form}
                addresses={addresses}
                neighborhoods={neighborhoods}
                neighborhoodLoading={neighborhoodLoading}
                addressUrl="/address-user"
                addAlias={true}
              />
            )}
          </>
        )}
      />
    </Form>
  );
}
