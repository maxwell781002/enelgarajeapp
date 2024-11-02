import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";

export type TransfermovilFormProps = {
  onChange: (value: any) => void;
  value: any;
  name: string;
  error: any;
};

export default function TransfermovilForm({
  name: globalName,
  value: globalValue,
  onChange,
  error,
}: TransfermovilFormProps) {
  const t = useTranslations("PaymentMethod");
  const handleChange = ({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) => {
    onChange({
      target: { name: globalName, value: { ...globalValue, [name]: value } },
    });
  };
  return (
    <>
      <FormItem>
        <FormLabel>{t("transfermovil.cardNumber")}</FormLabel>
        <FormControl>
          <Input
            placeholder={t("transfermovil.phCardNumber")}
            name="cardNumber"
            onChange={handleChange}
            value={globalValue?.cardNumber}
          />
        </FormControl>
        <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
      </FormItem>
      <FormItem>
        <FormLabel>{t("transfermovil.phone")}</FormLabel>
        <FormControl>
          <Input
            placeholder={t("transfermovil.phPhone")}
            name="phone"
            onChange={handleChange}
            value={globalValue?.phone}
          />
        </FormControl>
        <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
      </FormItem>
    </>
  );
}
