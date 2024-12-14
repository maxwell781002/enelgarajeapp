"use client";

import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useTranslations } from "next-intl";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";

const currency = "$";
const totalToPay = 100.0;
const numberOfOrders = 5;

type TransferDialogProps = {
  form: any;
  loading: boolean;
};

export default function TransferDialog({ form, loading }: TransferDialogProps) {
  const t = useTranslations("UserDetail");
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalToPay">{t("lbTotalToPay")}</Label>
          <p id="totalToPay" className="mt-1 text-lg font-medium">
            {currency} {totalToPay.toFixed(2)}
          </p>
        </div>
        <div>
          <Label htmlFor="numberOfOrders">{t("lbNumberOfOrders")}</Label>
          <p id="numberOfOrders" className="mt-1 text-lg font-medium">
            {numberOfOrders}
          </p>
        </div>
      </div>
      <FormField
        control={form.control}
        name="transferCode"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbTransferCode")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phTransferCode")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="businessNota"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbBusinessNota")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("phBusinessNota")} rows={3} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <Button loading={loading} type="submit" className="w-full">
        {t("btnTransfer")}
      </Button>
    </>
  );
}
