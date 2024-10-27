import { useTranslations } from "next-intl";
import { AddressType } from "@repo/model/validation/user";
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

export type AddressProps = {
  setAddressType: (type: AddressType) => void;
} & Omit<AddressFormProps, "name"> &
  Omit<AddressSelectorProps, "name">;

export default function Address({
  form,
  setAddressType,
  addresses = [],
  ...props
}: AddressProps) {
  const t = useTranslations("Address");
  const formCreate = <AddressForm form={form} {...props} name="address" />;
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      {!addresses.length ? (
        { formCreate }
      ) : (
        <Tabs defaultValue="address">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="address"
              onClick={() => setAddressType(AddressType.selectAddress)}
            >
              {t("tabSelectAddress")}
            </TabsTrigger>
            <TabsTrigger
              value="form"
              onClick={() => setAddressType(AddressType.newAddress)}
            >
              {t("tabCreateAddress")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="form">{formCreate}</TabsContent>
          <TabsContent value="address">
            <AddressSelect
              form={form}
              addresses={addresses}
              {...props}
              name="addressSelected"
            />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
