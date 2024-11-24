import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { SelectProps, SelectValueProps } from "@radix-ui/react-select";
import { PLANS_KEYS } from "@repo/model/lib/plans-feature";
import { useTranslations } from "next-intl";

export type PlanSelectProps = {
  onChange?: (value: string) => void;
} & SelectProps &
  SelectValueProps;

export function PlanSelect({ onChange, ...props }: PlanSelectProps) {
  const t = useTranslations("PlanSelect");
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger>
        <SelectValue {...props} />
      </SelectTrigger>
      <SelectContent>
        {PLANS_KEYS.map((plan: string) => (
          <SelectItem key={plan} value={plan}>
            {t(plan)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
