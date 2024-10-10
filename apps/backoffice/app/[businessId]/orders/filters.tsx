"use client";

import { Input } from "@repo/ui/components/ui/input";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";
import { useTranslations } from "next-intl";
import StatusSelect from "./status-select";

export default function Filter({
  onChange,
  options,
}: {
  onChange: (value: any) => void;
  options: [string, string][];
}) {
  const { changeFilter, value } = useFilterChange(onChange);
  const t = useTranslations("Order");
  return (
    <div className="flex flex-1 justify-between flex-col sm:flex-row gap-4">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="flex-1 bg-withe"
      />
      <div>
        <StatusSelect
          status={value.status}
          onChange={(e) => changeFilter("status", e)}
          options={[["", "", "TODOS"], ...options]}
          className="bg-withe"
        />
      </div>
    </div>
  );
}
