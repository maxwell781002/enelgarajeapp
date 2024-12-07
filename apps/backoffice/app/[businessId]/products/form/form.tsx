"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import { Form, FormMessage } from "@repo/ui/components/ui/form";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import { CompleteProduct } from "@repo/model/zod/product";
import {
  ProductUpdateValidation,
  ProductValidation,
} from "@repo/model/validation/product";
import { useMemo } from "react";
import GeneralProductForm, { GeneralProductFormProps } from "./general";
import Price, { PriceProps } from "./prices";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteProduct;
} & Omit<GeneralProductFormProps, "form"> &
  Omit<PriceProps, "form">;

export default function ProductForm({
  action,
  defaultValues,
  ...props
}: FormAction) {
  console.log("defaultValues", defaultValues);
  const t = useTranslations("Product");
  const { toast } = useToast();
  const resolver = useMemo(
    () =>
      zodResolver(
        defaultValues?.id ? ProductUpdateValidation : ProductValidation,
      ),
    [defaultValues?.id],
  );
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("productUpdated") : t("productCreated"),
      }),
  });
  const globalError = useMemo(
    () => form.formState.errors[""]?.message || "",
    [form.formState],
  );

  return (
    <Form {...form}>
      <FormMessage>{!!globalError && t(globalError)}</FormMessage>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">{t("tabGeneral")}</TabsTrigger>
            <TabsTrigger value="price">{t("tabPrice")}</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralProductForm form={form} {...props} />
          </TabsContent>
          <TabsContent value="price">
            <Price form={form} {...props} />
          </TabsContent>
        </Tabs>
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
