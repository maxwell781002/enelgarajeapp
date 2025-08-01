import { PropsWithChildren } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useTranslations } from "next-intl";
import { Switch } from "@repo/ui/components/ui/switch";

export type BaseGatewayAdminFormType = {
  form: any;
} & PropsWithChildren;

export default function BaseGatewayAdminForm({
  children,
  form,
}: BaseGatewayAdminFormType) {
  const t = useTranslations("PaymentMethod");
  return (
    <>
      <FormField
        control={form.control}
        name="active"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbActive")}</FormLabel>
            <FormControl>
              <Switch
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      {children}
    </>
  );
}
