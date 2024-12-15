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
import PriceDisplay from "@repo/ui/components/prices/price";
import { CollaboratorCardBank } from "@repo/model/prisma/generated/client/index.d";
import EntitySelect from "@repo/ui/components/entity-select";
import { transfermovilText } from "@repo/model/lib/utils";
import Qr from "@repo/ui/components/qr";
import CopyToClipboard from "@repo/ui/components/copy-to-clipboard/copy-to-clipboard-text";

type TransferDialogProps = {
  totalToPay: number;
  numberOfOrders: number;
  form: any;
  loading: boolean;
  cards: CollaboratorCardBank[];
};

export default function TransferDialog({
  form,
  loading,
  totalToPay,
  numberOfOrders,
  cards,
}: TransferDialogProps) {
  const t = useTranslations("UserDetail");
  const cardBank = cards.find((card) => card.id === form.watch("cardBankId"));
  const textQr = transfermovilText(
    cardBank?.cardNumber as string,
    cardBank?.phone as string
  );
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalToPay">{t("lbTotalToPay")}</Label>
          <p id="totalToPay" className="mt-1 text-lg font-medium">
            <PriceDisplay price={totalToPay} />
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
        name="cardBankId"
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbPaymentMethod")}</FormLabel>
            <FormControl>
              <EntitySelect
                items={cards.map((card) => ({
                  name: `${card.cardNumber}`,
                  ...card,
                }))}
                placeholder={t("phPaymentMethod")}
                {...field}
              />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      {cardBank && (
        <div className="grid grid-rows sm:grid-cols-2 gap-4 bg-slate-100 p-4">
          <Qr value={textQr} addCopy={true} image="/transfermovilIcon.jpg" />
          <div>
            <div className="grid grid-cols-2 gap-2">
              <dt className="font-medium">{t("cardNumber")}</dt>
              <dd>
                <CopyToClipboard text={cardBank.cardNumber as string} />
              </dd>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <dt className="font-medium">{t("phone")}</dt>
              <dd>
                <CopyToClipboard text={cardBank.phone as string} />
              </dd>
            </div>
          </div>
        </div>
      )}
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
