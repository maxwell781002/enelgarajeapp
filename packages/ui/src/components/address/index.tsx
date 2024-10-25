import { useTranslations } from "next-intl";
import AddressSelect from "./address-select";
import AddressForm, { AddressFormProps } from "./form";

export type AddressProps = AddressFormProps;

export default function Address({ ...props }: AddressProps) {
  const t = useTranslations("Address");
  return (
    <>
      <h1 className="text-1xl font-bold">{t("title")}</h1>
      <AddressForm {...props} />
      <AddressSelect />
    </>
  );
}
