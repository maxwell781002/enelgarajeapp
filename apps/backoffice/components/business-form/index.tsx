"use client";

import { Button } from "@repo/ui/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import BusinessForm, { BusinessFormProps } from "./business-form";
import { CompleteBusiness } from "@repo/model/zod/business";
import { useTranslations } from "next-intl";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessValidation } from "@repo/model/validation/business";
import BusinessAdminForm, { BusinessAdminFormProps } from "./admin-form";
import { Form } from "@repo/ui/components/ui/form";

const resolver = zodResolver(BusinessValidation);

export type BusinessMasterFormProps = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteBusiness;
  isAdmin?: boolean;
} & Pick<BusinessAdminFormProps, "users"> &
  Omit<BusinessFormProps, "form">;

export default function BusinessMasterForm({
  action,
  defaultValues,
  isAdmin = false,
  ...props
}: BusinessMasterFormProps) {
  const t = useTranslations("Business");
  const { toast } = useToast();
  const [showTelegram, setShowTelegram] = useState(!!defaultValues.telegram);
  const { form, onSubmit } = useFormProcess({
    resolver,
    action: (form: FormData) => {
      if (!showTelegram) {
        form.delete("telegram");
      }
      return action(form);
    },
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("businessUpdated") : t("businessCreated"),
      }),
  });
  useEffect(() => {
    if (showTelegram) {
      form.register("telegram");
    } else {
      form.unregister("telegram");
    }
  }, [form.register, form.unregister, showTelegram]);
  const formBusiness = <BusinessForm form={form} {...props} />;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!isAdmin ? (
          formBusiness
        ) : (
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="general">{t("tabGeneral")}</TabsTrigger>
              <TabsTrigger value="admin">{t("tabAdmin")}</TabsTrigger>
            </TabsList>
            <TabsContent value="general">{formBusiness}</TabsContent>
            <TabsContent value="admin">
              <BusinessAdminForm
                form={form}
                showTelegram={showTelegram}
                users={props.users}
                setShowTelegram={setShowTelegram}
              />
            </TabsContent>
          </Tabs>
        )}
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
