"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { getNeighborhoodsByCityAndBusiness } from "@repo/model/api/neighborhood";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import { AddressModel, CompleteAddress } from "@repo/model/zod/address";
import AddressForm from "@repo/ui/components/address/form";
import { Button } from "@repo/ui/components/ui/button";
import { Form } from "@repo/ui/components/ui/form";
import { useToast } from "@repo/ui/components/ui/use-toast";
import { useFormProcess } from "@repo/ui/hooks/useFormProcess";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export type AddressUserFormProps = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteAddress;
  business: string;
};

const resolver = zodResolver(AddressModel.omit({ id: true }));

export default function AddressUserForm({
  action,
  defaultValues,
  business,
}: AddressUserFormProps) {
  const { toast } = useToast();
  const t = useTranslations("Address");
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id ? t("addressUpdated") : t("addressCreated"),
      }),
  });
  const [neighborhoods, setNeighborhoods] = useState<
    NeighborhoodWithShipping[]
  >([]);
  const city = form.watch("city");
  useEffect(() => {
    if (city) {
      form.resetField("neighborhoodId");
      getNeighborhoodsByCityAndBusiness(city, business).then((data) => {
        setNeighborhoods(data);
      });
    }
  }, [city]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const handleSubmit = async (props: any) => {
    setBtnDisabled(true);
    await onSubmit(props);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <AddressForm neighborhoods={neighborhoods} form={form} />
        <Button type="submit" disabled={btnDisabled}>
          {t("save")}
        </Button>
      </form>
    </Form>
  );
}
