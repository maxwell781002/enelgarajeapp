import { Currency } from "@repo/model/types/enums";
import {
  SelectWidget,
  SelectWidgetProps,
  Item,
} from "@repo/ui/components/select";

export default function CurrencySelect(
  props: Omit<SelectWidgetProps, "items">,
) {
  const currencyItems = Object.entries(Currency).map(([label, value]) => ({
    label,
    value,
  }));
  return <SelectWidget items={currencyItems as Item[]} {...props} />;
}
