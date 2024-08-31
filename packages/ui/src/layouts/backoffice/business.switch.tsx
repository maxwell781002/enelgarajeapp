import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

export type Item = {
  name: string;
  id: string;
};

export type BusinessSwitchProps = {
  businessId: string;
  ph?: string;
  business: Item[];
  onChange?: (value: string) => void;
};

export default function BusinessSwitch({
  businessId,
  ph,
  business,
  onChange,
}: BusinessSwitchProps) {
  return (
    <Select onValueChange={onChange} value={businessId}>
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
          {/* <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
