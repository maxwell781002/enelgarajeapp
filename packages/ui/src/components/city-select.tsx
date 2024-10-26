import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { SelectProps, SelectValueProps } from "@radix-ui/react-select";
import { CITIES } from "@repo/ui/lib/locations/cities";

export type CitySelectProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
  state: string;
} & SelectProps &
  SelectValueProps;

export function CitySelect({ onChange, state, ...props }: CitySelectProps) {
  const cities = CITIES.filter((b) => b.state === state);
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {cities.map((b) => (
            <SelectItem key={b.code} value={b.code as string}>
              {b.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
