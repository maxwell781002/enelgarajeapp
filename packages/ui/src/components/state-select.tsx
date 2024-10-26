import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { SelectProps, SelectValueProps } from "@radix-ui/react-select";
import { STATES, IState } from "@repo/ui/lib/locations/states";

export type ProvinceSelectProps = {
  placeholder?: string;
  onChange?: (value: string) => void;
} & SelectProps &
  SelectValueProps;

export function ProvinceSelect({ onChange, ...props }: ProvinceSelectProps) {
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {STATES.map((b: IState) => (
            <SelectItem key={b.state} value={b.state as string}>
              {b.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
