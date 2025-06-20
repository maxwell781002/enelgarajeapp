"use client";

import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";
import { useTranslations } from "next-intl";

export default function Filter({
  onChange,
}: {
  onChange: (value: any) => void;
}) {
  const { changeFilter, value } = useFilterChange(onChange);
  const t = useTranslations("Business");
  return (
    <div className="flex flex-1 gap-2">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="flex-1 bg-withe"
      />
      <div className="flex items-center gap-2">
        <Switch
          checked={value.active}
          onCheckedChange={(value) => changeFilter("active", value)}
        />
        <label>{t("lbActive")}</label>
      </div>
    </div>
  );
}
