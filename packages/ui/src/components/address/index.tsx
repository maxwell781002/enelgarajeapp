import { useTranslations } from "next-intl";
import AddressForm, {
  AddressFormProps,
} from "@repo/ui/components/address/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import AddressSelect, {
  AddressSelectorProps,
} from "@repo/ui/components/address/address-select";

export type AddressProps = AddressFormProps & AddressSelectorProps;

export default function Address({
  form,
  name,
  addresses,
  ...props
}: AddressProps) {
  const t = useTranslations("Address");
  const formComponent = <AddressForm form={form} name={name} {...props} />;
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      {!addresses.length ? (
        formComponent
      ) : (
        <Tabs defaultValue="address">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address">{t("tabSelectAddress")}</TabsTrigger>
            <TabsTrigger value="form">{t("tabCreateAddress")}</TabsTrigger>
          </TabsList>
          <TabsContent value="form">{formComponent}</TabsContent>
          <TabsContent value="address">
            <AddressSelect
              form={form}
              name={name}
              addresses={addresses}
              {...props}
            />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
