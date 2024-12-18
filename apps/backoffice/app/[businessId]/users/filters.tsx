"use client";

import React from "react";
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
  const t = useTranslations("User");
  return (
    <div className="flex flex-1 justify-between flex-col sm:flex-row gap-4">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="flex-1 bg-withe mr-2"
      />
      <div className="flex justify-between flex-row gap-1">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {t("hasDoubts")}
        </label>
        <Switch
          checked={value.hasDoubts}
          onCheckedChange={(e) => changeFilter("hasDoubts", e)}
          className="bg-withe"
        />
      </div>
    </div>
  );
}
