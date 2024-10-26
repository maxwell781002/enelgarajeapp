import { useTranslations } from "next-intl";
import AddressSelect from "./address-select";
import AddressForm, { AddressFormProps } from "./form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";

export type AddressProps = AddressFormProps;

export default function Address({ form, name, ...props }: AddressProps) {
  const t = useTranslations("Address");
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      <AddressForm form={form} name={name} {...props} />
      <FormField
        control={form.control}
        name={`${name}.alias`}
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbSelectAddress")}</FormLabel>
            <FormControl>
              <AddressSelect {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
