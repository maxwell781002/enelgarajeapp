import { Currency } from "@repo/model/types/enums";
import { SelectWidget } from "./select";
import { SelectWidgetProps } from "./select.js";

export default function CurrencySelect(
  props: Omit<SelectWidgetProps, "items">,
) {
  const currencyItems = Object.entries(Currency).map(([label, value]) => ({
    label,
    value,
  }));
  return <SelectWidget items={currencyItems} {...props} />;
}
