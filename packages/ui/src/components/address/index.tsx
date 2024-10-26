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
import { AddressSelectorProps } from "./address-select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";

export type AddressProps = AddressFormProps & AddressSelectorProps;

export default function Address({ form, name, ...props }: AddressProps) {
  const t = useTranslations("Address");
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      <Tabs defaultValue="address">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="address">{t("tabSelectAddress")}</TabsTrigger>
          <TabsTrigger value="form">{t("tabCreateAddress")}</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <AddressForm form={form} name={name} {...props} />
        </TabsContent>
        <TabsContent value="address">
          <FormField
            control={form.control}
            name={`${name}.alias`}
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormControl>
                  <AddressSelect {...props} {...field} />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
