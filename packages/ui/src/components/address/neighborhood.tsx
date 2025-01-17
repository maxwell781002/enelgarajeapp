import { NeighborhoodWithShipping } from "@repo/model/types/neighborhood";
import Skeleton from "react-loading-skeleton";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import EntitySelect from "@repo/ui/components/entity-select";

export type NeighborhoodProps = {
  neighborhoodLoading: boolean;
  neighborhoods: NeighborhoodWithShipping[];
  form: any;
  name?: string;
  t: (key: string) => string;
  city: string;
};

export default function Neighborhood({
  neighborhoodLoading,
  neighborhoods,
  form,
  name = "",
  t,
  city,
}: NeighborhoodProps) {
  if (neighborhoodLoading) {
    return (
      <div className="pt-7">
        <Skeleton height={35} count={1} />
      </div>
    );
  }
  if (!neighborhoods.length) {
    return null;
  }
  return (
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
          <FormMessage>{!!error?.message && t(error?.message)}</FormMessage>
        </FormItem>
      )}
    />
  );
}
