"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { paymentGatewaysSchema } from "@repo/payment-method/schemas/index";
import { useTranslations } from "next-intl";
import { Form } from "@repo/ui/components/ui/form";
import { useFieldArray } from "react-hook-form";
import { getAdminForm, TKey } from "@repo/payment-method/ui/admin/index";
import { Button } from "@repo/ui/components/button";

const resolver = zodResolver(paymentGatewaysSchema);

const RenderItemForm = ({
  type,
  form,
  name,
}: {
  type: TKey;
  form: any;
  name: string;
}) => {
  const Component = getAdminForm(type);
  return <Component form={form} name={name} type={type} />;
};

export default function PaymentGatewayForm({
  businessId,
  defaultValues,
  action,
}: {
  businessId: string;
  defaultValues: any;
  action: (object: any) => Promise<any>;
}) {
  const t = useTranslations("PaymentGateway");
  const { toast } = useToast();

  const { form, onSubmit, saving } = useFormProcess({
    resolver,
    action,
    defaultValues: { forms: defaultValues },
    onSuccess: () =>
      toast({
        title: t("paymentGatewayUpdated"),
      }),
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "forms",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id}>
            <RenderItemForm
              form={form}
              type={(field as any).type}
              name={`forms.${index}`}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Button type="submit" loading={saving} loadingText={t("btnSaving")}>
            {t("btnSubmit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
