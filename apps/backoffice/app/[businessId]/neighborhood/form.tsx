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
import { ProvinceSelect } from "@repo/ui/components/state-select";
import { CitySelect } from "@repo/ui/components/city-select";
import { Switch } from "@repo/ui/components/ui/switch";
import EntitySelect from "@repo/ui/components/entity-select";
import { useEffect, useState } from "react";
import PriceDisplay from "@repo/ui/components/price";
import {
  BusinessNeighborhoodModel,
  CompleteBusinessNeighborhood,
} from "@repo/model/zod/businessneighborhood";

type FormAction = {
  action: (object: any) => Promise<any>;
  defaultValues: CompleteBusinessNeighborhood;
};

const resolver = zodResolver(BusinessNeighborhoodModel.omit({ id: true }));

export default function NeighborhoodForm({
  action,
  defaultValues,
}: FormAction) {
  const t = useTranslations("BusinessNeighborhood");
  const { toast } = useToast();
  const [neighborhoods, setNeighborhoods] = useState([]);
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
  const city = form.watch("city");
  useEffect(() => {
    if (city) {
      fetch(`/api/neighborhood?city=${city}`)
        .then((res) => res.json())
        .then((data) => {
          setNeighborhoods(data);
        });
    }
  }, [city]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <FormField
          control={form.control}
          name="neighborhoodId"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbNeighborhoodId")}</FormLabel>
              <FormControl>
                <EntitySelect
                  {...field}
                  placeholder={t("phNeighborhoodId")}
                  disabled={!city}
                  items={neighborhoods}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shipping"
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbShipping")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("phShipping")}
                  type="number"
                  {...field}
                  onChange={(event: any) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <PriceDisplay price={form.watch("shipping")} />
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
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit">{t("btnSubmit")}</Button>
      </form>
    </Form>
  );
}
