import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import AddressRadioGroup, {
  AddressRadioGroupProps,
} from "@repo/ui/components/address/address-radio-group";

export type AddressSelectorProps = {
  name: string;
  form: any;
} & AddressRadioGroupProps;

export default function AddressSelect({
  form,
  name,
  ...props
}: AddressSelectorProps) {
  const t = useTranslations("Address");
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }: any) => (
        <FormItem>
          <FormControl>
            <AddressRadioGroup {...props} {...field} />
          </FormControl>
          <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
        </FormItem>
      )}
    />
  );
}
