import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";

export type EnzonaFormProps = {
  onChange: (value: any) => void;
  value: any;
  name: string;
  error: any;
};

export default function EnzonaForm({
  name: globalName,
  value: globalValue,
  onChange,
  error,
}: EnzonaFormProps) {
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
        <FormLabel>{t("Enzona.lbAccountId")}</FormLabel>
        <FormControl>
          <Input
            placeholder={t("Enzona.phAccountId")}
            name="accountId"
            onChange={handleChange}
            value={globalValue?.accountId}
          />
        </FormControl>
        <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
      </FormItem>
    </>
  );
}
