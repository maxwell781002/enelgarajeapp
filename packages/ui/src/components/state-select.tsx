import { STATES, IState } from "@repo/ui/lib/locations/states";
import { SelectWidget, SelectWidgetProps } from "@repo/ui/components/select";

export function ProvinceSelect({ ...props }: Omit<SelectWidgetProps, "items">) {
  const items = STATES.map((b: IState) => ({
    label: b.name,
    value: b.state as string,
  }));
  return <SelectWidget {...props} items={items} />;
}
