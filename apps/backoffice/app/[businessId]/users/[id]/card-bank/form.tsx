"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CollaboratorCardBankModel,
  CompleteCollaboratorCardBank,
} from "@repo/model/zod/collaboratorcardbank";
import CurrencySelect from "@repo/ui/components/currency-select";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import NumericInput from "@repo/ui/components/text-number";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteCollaboratorCardBank;
};

const resolver = zodResolver(
  CollaboratorCardBankModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }),
);

export default function CardBankForm({ action, defaultValues }: FormAction) {
  const t = useTranslations("CardBank");
  const { toast } = useToast();
  const { form, onSubmit, saving } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id
          ? t("collaboratorCardBankUpdated")
          : t("collaboratorCardBankCreated"),
      }),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="alias"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbAlias")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phAlias")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCardNumber")}</FormLabel>
              <FormControl>
                <NumericInput
                  placeholder={t("phCardNumber")}
                  maxLength={12}
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbPhone")}</FormLabel>
              <FormControl>
                <NumericInput
                  placeholder={t("phPhone")}
                  maxLength={8}
                  {...field}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCurrency")}</FormLabel>
              <FormControl>
                <CurrencySelect placeholder={t("phCurrency")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button loading={saving} loadingText={t("btnSaving")} type="submit">
          {t("btnSubmit")}
        </Button>
      </form>
    </Form>
  );
}
