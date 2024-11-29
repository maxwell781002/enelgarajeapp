import { SelectProps, SelectValueProps } from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { useCallback } from "react";

export type Item = {
  name: string;
  id: string | null;
};

export type EntitySelectProps = {
  placeholder?: string;
  items: Item[];
  onChange?: (value: string) => void;
} & SelectProps &
  SelectValueProps;

export default function EntitySelect({
  items,
  onChange,
  ...props
}: EntitySelectProps) {
  const handleChange = useCallback(
    (value: string) => onChange?.(value || ""),
    [onChange],
  );
  return (
    <Select onValueChange={handleChange} {...props}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((b) => (
            <SelectItem key={b.id} value={b.id as string}>
              {b.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
