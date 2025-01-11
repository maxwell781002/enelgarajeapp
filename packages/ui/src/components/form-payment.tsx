import { FormOfPaymentType } from "@repo/model/types/enums";
import {
  Item,
  SelectWidget,
  SelectWidgetProps,
} from "@repo/ui/components/select";
import { useTranslations } from "next-intl";

export default function FormOfPaymentSelect(
  props: Omit<SelectWidgetProps, "items">,
) {
  const t = useTranslations("FormOfPaymentSelect");
  const items = Object.entries(FormOfPaymentType).map(([label, value]) => ({
    label: t(label),
    value,
  }));
  return <SelectWidget items={items as Item[]} {...props} />;
}
