"use client";

import { useOptimistic } from "react";
import StatusSelect from "../status-select";

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
  const handleChangeStatus = async (status: string) => {
    setOptimisticStatus(status);
    await onChange(status);
  };
  return (
    <StatusSelect
      status={optimisticStatus}
      onChange={handleChangeStatus}
      options={options}
    />
  );
}
