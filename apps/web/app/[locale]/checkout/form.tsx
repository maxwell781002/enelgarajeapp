"use client";

import { AddressType, TUserRegisterSchema } from "@repo/model/validation/user";
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
import Address from "@repo/ui/components/address/index";
import { CompleteBusiness } from "@repo/model/zod/business";
import { CompleteAddress } from "@repo/model/zod/address";
import AlertMessage from "@repo/ui/components/alert-message";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { Switch } from "@repo/ui/components/ui/switch";

type CheckoutFormProps = {
  action: (state: TUserRegisterSchema) => Promise<any>;
  defaultValues?: TUserRegisterSchema;
  business: CompleteBusiness;
  addresses: CompleteAddress[];
  shopCartHasError?: boolean;
  form: any;
  setAddressType: (type: AddressType) => void;
  neighborhoods?: NeighborhoodWithShipping[];
  showWantDomicile?: boolean;
};

export function CheckoutForm({
  action,
  defaultValues,
  business,
  addresses,
  shopCartHasError = false,
  form: { formState, ...form },
  setAddressType,
  neighborhoods = [],
  showWantDomicile = false,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  return (
    <Form {...form} formState={formState}>
      <form
        onSubmit={form.handleSubmit((data: any) =>
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
            addresses={addresses}
            setAddressType={setAddressType}
            neighborhoods={neighborhoods}
          />
        )}
        {shopCartHasError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
          />
        )}
        {showWantDomicile && (
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
        )}
        <Button
          type="submit"
          disabled={shopCartHasError || formState.isSubmitting}
        >
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
