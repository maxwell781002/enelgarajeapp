"use client";

import StatusSelect from "@repo/ui/components/status/status-select";
import { useOptimistic, useTransition } from "react";

type ChangeStatusProps = {
  status: string;
  onChange: (status: string) => void;
  options: [string, string][];
};

export default function ChangeStatus({
  status,
  onChange,
  options,
}: ChangeStatusProps) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const [loading, startLoading] = useTransition();
  const handleChangeStatus = async (status: string) => {
    setOptimisticStatus(status);
    startLoading(() => onChange(status));
  };
  return (
    <StatusSelect
      status={optimisticStatus}
      onChange={handleChangeStatus}
      options={options}
      disabled={loading}
    />
  );
}
