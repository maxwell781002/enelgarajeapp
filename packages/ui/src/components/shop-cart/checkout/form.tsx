import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";

export type CheckoutFormProps = {
  form: any;
  buttonDisabled: boolean;
  action: (data: any) => Promise<any>;
};

export default function CheckoutForm({
  form,
  buttonDisabled,
  action,
}: CheckoutFormProps) {
  const t = useTranslations("Checkout");
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data: any) => action({ ...data }))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lblName")}</FormLabel>
              <FormControl>
                <Input {...field} value={field.value as string} />
              </FormControl>
              <FormDescription>{t("phName")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lbPhone")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>{t("phPhone")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={buttonDisabled}>
          {t("continue")}
        </Button>
      </form>
    </Form>
  );
}
