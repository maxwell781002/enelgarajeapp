"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import StatusLabel from "./status-label";
import { cn } from "@repo/ui/lib/utils";

type ChangeStatusProps = {
  status: string;
  onChange: (status: string) => void;
  options: [string, string, string?][];
  className?: string;
};

// I need to add this color to be rendered by tailwind
const statusColors: Record<string, string> = {
  CREATED: "bg-yellow-500",
  SEND: "bg-blue-500",
  PAYED: "bg-purple-500",
  REJECTED: "bg-red-500",
};

export default function StatusSelect({
  status,
  onChange,
  options,
  className,
}: ChangeStatusProps) {
  return (
    <Select value={status} onValueChange={(value) => onChange(value)}>
      <SelectTrigger
        className={cn("w-[120px] h-8 text-xs bg-white", className)}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {options.map(([value, color, label]) => (
          <SelectItem
            key={value || null}
            value={(value || null) as string}
            className="text-xs"
          >
            <StatusLabel status={label || value} color={color} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
