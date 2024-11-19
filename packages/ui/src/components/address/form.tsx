import { useTranslations } from "next-intl";
import { FormField } from "@repo/ui/components/ui/form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { ProvinceSelect } from "@repo/ui/components/state-select";
import { CitySelect } from "@repo/ui/components/city-select";
import EntitySelect from "@repo/ui/components/entity-select";
import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";

export type AddressFormProps = {
  form: any;
  name?: string;
  neighborhoods: NeighborhoodWithShipping[];
};

export default function AddressForm({
  form,
  name = "",
  neighborhoods,
}: AddressFormProps) {
  const t = useTranslations("Address");
  name = name ? `${name}.` : "";
  const state = form.watch(`${name}state`);
  const city = form.watch(`${name}city`);

  return (
    <div className="grid grid-cols-1 gap-4">
      <FormField
        control={form.control}
        name={`${name}alias`}
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbAlias")}</FormLabel>
            <FormControl>
              <Input placeholder={t("phAlias")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${name}name`}
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
        name={`${name}address`}
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbAddress")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("phAddress")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
      <div className="grid sm:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name={`${name}state`}
          render={({ field, fieldState: { error } }: any) => (
            <FormItem>
              <FormLabel>{t("lbProvince")}</FormLabel>
              <FormControl>
                <ProvinceSelect {...field} placeholder={t("phProvince")} />
              </FormControl>
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${name}city`}
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
              <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
            </FormItem>
          )}
        />
        {neighborhoods.length > 0 && (
          <FormField
            control={form.control}
            name={`${name}neighborhoodId`}
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
                <FormMessage>
                  {!!error?.message && t(error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />
        )}
      </div>
      <FormField
        control={form.control}
        name={`${name}reference`}
        render={({ field, fieldState: { error } }: any) => (
          <FormItem>
            <FormLabel>{t("lbReference")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("phReference")} {...field} />
            </FormControl>
            <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
