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
import { Textarea } from "@repo/ui/components/ui/textarea";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import { CompleteProduct } from "@repo/model/zod/product";
import EntitySelect from "@repo/ui/components/entity-select";
import {
  ProductUpdateValidation,
  ProductValidation,
} from "@repo/model/validation/product";
import { useMemo } from "react";
import { Switch } from "@repo/ui/components/ui/switch";
import PriceWidget from "@repo/ui/components/price-widget";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteProduct;
  categories: any[];
};

export default function ProductForm({
  action,
  defaultValues,
  categories,
}: FormAction) {
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
          name="categoryId"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbCategoryId")}</FormLabel>
              <FormControl>
                <EntitySelect
                  {...field}
                  items={categories}
                  placeholder={t("phCategoryId")}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbPriority")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phPriority")}
                  type="number"
                  {...field}
                  onChange={(event: any) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex flex-1 gap-4">
          <FormField
            control={form.control}
            name="active"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbActive")}</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isNew"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbIsNew")}</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isExhaustible"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbIsExhaustible")}</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="allowOrderOutOfStock"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbAllowOrderOutOfStock")}</FormLabel>
                <FormControl>
                  <Switch
                    {...field}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="stock"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbStock")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phStock")}
                  {...field}
                  onChange={(event: any) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }: any) => (
            <FormItem>
              <FormLabel>{t("lbImage")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phImage")}
                  {...field}
                  value={value?.fileName}
                  type="file"
                  onChange={(event: any) => {
                    onChange(event.target.files[0]);
                  }}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <PriceWidget form={form} />
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
