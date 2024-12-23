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
import { Button } from "@repo/ui/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  AddressType,
  WebShoppingCartSchema,
} from "@repo/model/validation/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Address from "@repo/ui/components/address/index";
import { CompleteAddress } from "@repo/model/zod/address";
import { useEffect, useState, useTransition } from "react";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { CompleteBusiness } from "@repo/model/zod/business";
import { getNeighborhoodsByCityAndBusiness } from "@repo/model/api/neighborhood/callback";
import { Switch } from "@repo/ui/components/ui/switch";
import { getShippingPrice } from "@repo/model/lib/order";
import { useStore } from "@repo/ui/stores/index";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import Total from "@repo/ui/components/shop-cart/checkout/total";
import AlertMessage from "@repo/ui/components/alert-message";

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
  const orderTotal = useStore(useShopCart, (state) => state.orderTotal(false));
  const [shopCartHasError, setShopCartHasError] = useState(false);
  const handlerAction = async (data: any) => {
    const result = await action(data);
    if (result.message === "out_of_stock") {
      setShopCartHasError(true);
    }
  }
  const form = useForm<TWebShoppingCartSchema>({
    resolver: zodResolver(WebShoppingCartSchema),
    defaultValues,
  });
  const requestAddress = form.watch("businessRequestAddress");
  const addressType = form.watch("addressType") as AddressType;
  const city = form.watch(`${addressType}.city`);
  const neighborhoodId = form.watch(`${addressType}.neighborhoodId`);
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithShipping[]
  >([]);
  const [neighborhoodLoading, startNeighborhoodLoading] = useTransition();
  useEffect(() => {
    if (city && business) {
      startNeighborhoodLoading(() => {
        form.resetField(`${AddressType.newAddress}.neighborhoodId`);
        getNeighborhoodsByCityAndBusiness(city, business.id).then((data) => {
          setNeighborhoods(data);
        });
      });
    }
  }, [city, business.id]);
  const currentNeighborhood = neighborhoods.find(
    (neighborhood) => neighborhood.id === neighborhoodId,
  );
  const wantDomicile = form.watch("wantDomicile");
  const { total, shippingPrice } = getShippingPrice(
    orderTotal as number,
    currentNeighborhood?.shipping || 0,
    wantDomicile as boolean,
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: any) => handlerAction({ ...data }))}
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
        {!!requestAddress && (
          <>
            <Address
              form={form}
              addresses={addresses}
              neighborhoods={neighborhoods}
              addressUrl="/address-user"
              addAlias={true}
            />
            <FormField
              control={form.control}
              name="wantDomicile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("lbWantDomicile")}</FormLabel>
                  <FormControl>
                    <Switch
                      {...field}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Total
          shippingPrice={shippingPrice}
          subtotal={orderTotal as number}
          total={total}
          wantDomicile={wantDomicile as boolean}
        />
        {shopCartHasError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
          />
        )}
        <Button
          type="submit"
          disabled={neighborhoodLoading || form.formState.isSubmitting}
        >
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
