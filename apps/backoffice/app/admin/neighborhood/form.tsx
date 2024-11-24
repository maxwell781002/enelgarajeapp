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
import {
  CompleteNeighborhood,
  NeighborhoodModel,
} from "@repo/model/zod/neighborhood";
import { ProvinceSelect } from "@repo/ui/components/state-select";
import { CitySelect } from "@repo/ui/components/city-select";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteNeighborhood;
};

const resolver = zodResolver(NeighborhoodModel.omit({ id: true }));

export default function NeighborhoodForm({
  action,
  defaultValues,
}: FormAction) {
  const t = useTranslations("Neighborhood");
  const { toast } = useToast();
  const { form, onSubmit } = useFormProcess({
    resolver,
    action,
    defaultValues,
    onSuccess: () =>
      toast({
        title: defaultValues?.id
          ? t("neighborhoodUpdated")
          : t("neighborhoodCreated"),
      }),
  });
  const state = form.watch("state");

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
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbProvince")}</FormLabel>
                <FormControl>
                  <ProvinceSelect {...field} placeholder={t("phProvince")} />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState: { error } }: any) => (
              <FormItem>
                <FormLabel>{t("lbCity")}</FormLabel>
                <FormControl>
                  <CitySelect
                    {...field}
                    placeholder={t("phCity")}
                    disabled={!state}
                    state={state}
                  />
                </FormControl>
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
