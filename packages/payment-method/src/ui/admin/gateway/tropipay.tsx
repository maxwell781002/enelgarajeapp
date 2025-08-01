import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import BaseGatewayAdminForm, { BaseGatewayAdminFormType } from "../base-form";
import { useTranslations } from "next-intl";
import { Input } from "@repo/ui/components/ui/input";

export default function TropipayAdminForm({
  form,
  ...rest
}: Omit<BaseGatewayAdminFormType, "children">) {
  const t = useTranslations("PaymentMethod");
  return (
    <BaseGatewayAdminForm form={form} {...rest}>
      <FormField
        control={form.control}
        name="clientId"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbClientId")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("phClientId")} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="clientSecret"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbClientSecret")}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t("phClientSecret")} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </BaseGatewayAdminForm>
  );
}
