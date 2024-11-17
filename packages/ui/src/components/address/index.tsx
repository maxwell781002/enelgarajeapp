import { useTranslations } from "next-intl";
import { AddressType } from "@repo/model/validation/user";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
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
import Link from "next/link";

export type AddressProps = {
  setAddressType: (type: AddressType) => void;
  neighborhoods?: NeighborhoodWithShipping[];
} & Omit<AddressFormProps, "name"> &
  Omit<AddressSelectorProps, "name">;

export default function Address({
  form,
  setAddressType,
  addresses = [],
  neighborhoods = [],
  ...props
}: AddressProps) {
  const t = useTranslations("Address");
  const formCreate = (
    <AddressForm
      form={form}
      neighborhoods={neighborhoods}
      {...props}
      name={AddressType.newAddress}
    />
  );
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      {!addresses.length ? (
        formCreate
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
            <Link
              href="/address-user"
              className="text-sm text-green-600 hover:text-green-800 transition-colors text-center block mb-2"
            >
              {t("linkMyAddresses")}
            </Link>
            <AddressSelect
              form={form}
              addresses={addresses}
              {...props}
              name={AddressType.selectAddress}
            />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
