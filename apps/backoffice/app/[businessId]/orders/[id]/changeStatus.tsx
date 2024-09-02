"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import StatusLabel from "../status-label";
import { useOptimistic } from "react";

type ChangeStatusProps = {
  status: string;
  onChange: (status: string) => void;
  options: [string, string][];
};

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  shipped: "bg-purple-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function ChangeStatus({
  status,
  onChange,
  options,
}: ChangeStatusProps) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const handleChangeStatus = async (status: string) => {
    setOptimisticStatus(status);
    await onChange(status);
  };
  return (
    <Select
      value={optimisticStatus}
      onValueChange={(value) => handleChangeStatus(value)}
    >
      <SelectTrigger className="w-[120px] h-8 text-xs">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {options.map(([value, color]) => (
          <SelectItem key={value} value={value} className="text-xs">
            <StatusLabel status={value} color={color} />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
