"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
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
import { BusinessModel, CompleteBusiness } from "@repo/model/zod/business";
import { Textarea } from "@repo/ui/components/ui/textarea";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteBusiness;
};

const resolver = zodResolver(
  BusinessModel.omit({ id: true, coordinates: true }),
);

export default function BusinessForm({ action, defaultValues }: FormAction) {
  const t = useTranslations("Business");
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("businessUpdated") : t("businessCreated"),
      }),
  });
  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phName")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbDescription")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("phDescription")} {...field} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
