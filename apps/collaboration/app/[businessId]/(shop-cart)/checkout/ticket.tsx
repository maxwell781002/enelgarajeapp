import CurrencySelect from "@repo/ui/components/currency-select";
import { DateTimePicker } from "@repo/ui/components/date-widget";
import FormOfPaymentSelect from "@repo/ui/components/form-payment";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Switch } from "@repo/ui/components/ui/switch";
import { Textarea } from "@repo/ui/components/ui/textarea";

export type TicketFormProps = {
  form: any;
  t: (key: string) => string;
};

export default function TicketForm({ form, t }: TicketFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="ticket.deliveryDate"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbTicketDeliveryDate")}</FormLabel>
              <FormControl>
                <DateTimePicker
                  placeholder={t("phTicketDeliveryDate")}
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket.currency"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbTicketCurrency")}</FormLabel>
              <FormControl>
                <CurrencySelect
                  placeholder={t("phTicketCurrency")}
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket.formOfPayment"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbTicketFormOfPayment")}</FormLabel>
              <FormControl>
                <FormOfPaymentSelect
                  placeholder={t("phTicketFormOfPayment")}
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="ticket.acceptTerms"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbAcceptTerms")}</FormLabel>
            <FormControl>
              <Switch
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ticket.nota"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbTicketNota")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("phTicketNota")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
}
