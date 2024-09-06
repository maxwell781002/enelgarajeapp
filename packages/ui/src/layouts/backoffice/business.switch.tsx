import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

export type Item = {
  name: string;
  id: string;
};

export type BusinessSwitchProps = {
  businessId?: string;
  ph?: string;
  business: Item[];
  onChangeBusiness?: (value: string) => void;
};

export default function BusinessSwitch({
  businessId,
  ph,
  business,
  onChangeBusiness,
}: BusinessSwitchProps) {
  return (
    <Select onValueChange={onChangeBusiness} value={businessId}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={ph} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {business.map((b) => (
            <SelectItem key={b.id} value={b.id as string}>
              {b.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
