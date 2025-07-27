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
  const t = useTranslations("Customers");
  return (
    <div className="flex flex-1 justify-between flex-col sm:flex-row gap-4">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="flex-1 bg-withe mr-2"
      />
    </div>
  );
}
