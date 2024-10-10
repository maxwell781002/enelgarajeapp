"use client";

import { CompleteCategory } from "@repo/model/zod/category";
import EntitySelect from "@repo/ui/components/entity-select";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";

export type FilterType = {
  categories: CompleteCategory[];
  onChange: (value: any) => void;
};

export default function Filter({ onChange, categories }: FilterType) {
  const { changeFilter, value } = useFilterChange(onChange);
  const t = useTranslations("Product");
  return (
    <div className="flex flex-1 justify-between flex-col sm:flex-row gap-4">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="flex-1 bg-withe"
      />
      <div>
        <EntitySelect
          items={[{ name: "Todos", id: null }, ...categories]}
          placeholder={t("phCategoryId")}
          className="bg-withe"
          onChange={(value) => changeFilter("categoryId", value)}
        />
      </div>
    </div>
  );
}
