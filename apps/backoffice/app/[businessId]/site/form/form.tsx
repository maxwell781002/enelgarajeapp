"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  BusinessSiteUpdateValidation,
  BusinessSiteValidation,
} from "@repo/model/validation/business-site";

export default function FormSite({
  action,
  defaultValues,
}: {
  action: (form: FormData) => Promise<void>;
  defaultValues: any;
}) {
  const t = useTranslations("BusinessSite");
  const { toast } = useToast();
  const schema = defaultValues.id
    ? BusinessSiteUpdateValidation
    : BusinessSiteValidation;
  const { form, onSubmit, saving } = useFormProcess({
    resolver: zodResolver(schema),
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id
          ? t("businessSiteUpdated")
          : t("businessSiteCreated"),
      }),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="logo"
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }: any) => (
            <FormItem>
              <FormLabel>{t("lbLogo")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phLogo")}
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
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbEmail")}</FormLabel>
              <FormControl>
                <Input placeholder={t("phEmail")} {...field} type="email" />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={saving}
          loading={saving}
          loadingText={t("btnSaving")}
        >
          {t("btnSubmit")}
        </Button>
      </form>
    </Form>
  );
}
