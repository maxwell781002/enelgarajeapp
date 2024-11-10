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
import AlertMessage from "@repo/ui/components/alert-message";

type CheckoutFormProps = {
  action: (state: TUserRegisterSchema) => Promise<any>;
  defaultValues?: TUserRegisterSchema;
  business: CompleteBusiness;
  addresses: CompleteAddress[];
  shopCartHasError?: boolean;
};

const address: Omit<CompleteAddress, "id"> = {
  alias: "",
  name: "",
  address: "",
  city: "",
  state: "",
  reference: "",
};

export function CheckoutForm({
  action,
  defaultValues,
  business,
  addresses,
  shopCartHasError: _shopCartHasError = false,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  const [shopCartHasError, setShopCartHasError] = useState(_shopCartHasError);
  const [addressType, setAddressType] = useState(
    addresses.length ? AddressType.selectAddress : AddressType.newAddress,
  );
  const schema = useMemo(
    () =>
      business.requestAddress
        ? UserRegisterSchema.extend({
            [addressType]: addressValidation[addressType],
          })
        : UserRegisterSchema,
    [addressType],
  );
  const { formState, ...form } = useForm<TUserRegisterSchema>({
    resolver: zodResolver(schema),
    defaultValues: business.requestAddress
      ? ({ ...defaultValues, [AddressType.newAddress]: address } as any)
      : defaultValues,
  });
  useEffect(() => {
    form.setValue("addressType", String(addressType));
  }, [addressType, form]);
  const handleAction = async (data: TUserRegisterSchema) => {
    try {
      await action(data);
    } catch (error: any) {
      if (error.message === "out_of_stock") {
        setShopCartHasError(true);
      }
    }
  };

  return (
    <Form {...form} formState={formState}>
      <form
        onSubmit={form.handleSubmit((data) =>
          handleAction({ ...defaultValues, ...data }),
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
          />
        )}
        {shopCartHasError && (
          <AlertMessage
            variant="destructive"
            text={t("errors.has_out_of_stock")}
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
