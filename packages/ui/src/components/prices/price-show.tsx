import { TCurrency } from "@repo/model/types/enums";
import { FormLabel } from "../ui/form";
import PriceDisplay from "./price";
import { cn } from "@repo/ui/lib/utils";

export default function PriceShow({
  price = 0,
  currency,
  label,
}: {
  price: number | undefined;
  currency?: TCurrency;
  label: string;
}) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <PriceDisplay
        price={price}
        currency={currency}
        classNameText={cn(
          "text-lg font-bold",
          price && price <= 0 && "text-red-600",
        )}
      />
    </div>
  );
}
