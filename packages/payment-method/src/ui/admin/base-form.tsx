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
  type: string
} & PropsWithChildren;

export default function BaseGatewayAdminForm({
  children,
  form,
  name,
  type,
}: BaseGatewayAdminFormType) {
  const t = useTranslations("PaymentGateway");
  return (
    <>
      <div className="mb-1">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {t(`titles.${type}`)}
        </h2>
      </div>
      <div className="p-6 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
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
      </div>
    </>
  );
}
