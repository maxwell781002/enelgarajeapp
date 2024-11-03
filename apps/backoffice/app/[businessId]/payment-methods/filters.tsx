"use client";

import { Input } from "@repo/ui/components/ui/input";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";
import { useTranslations } from "next-intl";

export default function Filter({
  onChange,
}: {
  onChange: (value: any) => void;
}) {
  const { changeFilter, value } = useFilterChange(onChange);
  const t = useTranslations("PaymentMethod");
  return (
    <Input
      placeholder={t("phSearch")}
      onChange={(e) => changeFilter("query", e.target.value)}
      defaultValue={value.query?.toString()}
      className="flex-1 bg-withe"
    />
  );
}
