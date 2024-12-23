"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CollaboratorShoppingCartSchema } from "@repo/model/validation/user";
import { CompleteBusiness } from "@repo/model/zod/business";
import AddressForm from "@repo/ui/components/address/form";
import AlertMessage from "@repo/ui/components/alert-message";
import { Button } from "@repo/ui/components/button";
import { useCheckoutNeighborhood } from "@repo/ui/components/shop-cart/checkout/hooks";
import Total from "@repo/ui/components/shop-cart/checkout/total";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Switch } from "@repo/ui/components/ui/switch";
import { useStore } from "@repo/ui/stores/index";
import { useShopCart } from "@repo/ui/stores/shop-cart";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type TCollaboratorShoppingCartSchema = z.infer<
  typeof CollaboratorShoppingCartSchema
>;

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
  const orderTotal = useStore(useShopCart, (state) => state.orderTotal(true));
  const [shopCartHasError, setShopCartHasError] = useState(false);
  const handlerAction = async (data: any) => {
    const result = await action(data);
    if (result.message === "out_of_stock") {
      setShopCartHasError(true);
    }
  };
  const form = useForm<TCollaboratorShoppingCartSchema>({
    resolver: zodResolver(CollaboratorShoppingCartSchema),
    defaultValues,
  });
  const {
    neighborhoods,
    shippingPrice,
    total,
    wantDomicile,
    neighborhoodLoading,
  } = useCheckoutNeighborhood(
    form,
    business.id,
    "address",
    orderTotal as number,
    () => form.resetField("address.neighborhoodId"),
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: any) => handlerAction({ ...data }))}
        className="space-y-8"
      >
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
        {wantDomicile && (
          <AddressForm
            form={form}
            neighborhoods={neighborhoods}
            addAlias={false}
            name="address"
          />
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
