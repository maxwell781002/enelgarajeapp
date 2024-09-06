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
import { CategoryModel, CompleteCategory } from "@repo/model/zod/category";
import { useTranslations } from "next-intl";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteCategory;
};

const resolver = zodResolver(CategoryModel.omit({ id: true }));

export default function CategoryForm({ action, defaultValues }: FormAction) {
  const t = useTranslations("Category");
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("categoryUpdated") : t("categoryCreated"),
      }),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lblName")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phName")} {...field} />
              </FormControl>
              <FormMessage>{t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
