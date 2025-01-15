import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";

type CustomerFormProps = {
  form: any;
  t: (key: string) => string;
};

export default function CustomerForm({ form, t }: CustomerFormProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="customer.name"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbCustomerName")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phCustomerName")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="customer.identification"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCustomerIdentification")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phCustomerIdentification")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="customer.phone"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCustomerPhone")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phCustomerPhone")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
