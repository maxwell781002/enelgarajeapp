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
  name: string;
} & PropsWithChildren;

export default function BaseGatewayAdminForm({
  children,
  form,
  name,
}: BaseGatewayAdminFormType) {
  const t = useTranslations("PaymentGateway");
  return (
    <>
      <FormField
        control={form.control}
        name={`${name}.active`}
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
