import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { SelectProps, SelectValueProps } from "@radix-ui/react-select";

export type Item = {
  label: string;
  value: string;
};

export type SelectWidgetProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  items: Item[];
} & SelectProps &
  SelectValueProps;

export function SelectWidget({ onChange, items, ...props }: SelectWidgetProps) {
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((b: Item) => (
            <SelectItem key={b.value} value={b.label}>
              {b.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
