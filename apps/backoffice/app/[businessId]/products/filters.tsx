"use client";

import { CompleteCategory } from "@repo/model/zod/category";
import EntitySelect from "@repo/ui/components/entity-select";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export type FilterType = {
  categories: CompleteCategory[];
  onChange: (value: any) => void;
};

export default function Filter({ onChange, categories }: FilterType) {
  const searchParams = useSearchParams();
  const handleSearch = useDebouncedCallback((name, term) => {
    const value = Array.from(searchParams.entries()).reduce(
      (obj, [key, val]) => ({ ...obj, [key]: val }),
      {},
    );
    onChange({
      ...value,
      [name]: term,
    });
  }, 300);
  const t = useTranslations("Product");
  return (
    <div className="flex flex-1 justify-between flex-col sm:flex-row gap-4">
      <Input
        placeholder={t("phSearch")}
        onChange={(e) => handleSearch("query", e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
        className="flex-1 bg-withe"
      />
      <div>
        <EntitySelect
          items={[{ name: "Todos", id: null }, ...categories]}
          placeholder={t("phCategoryId")}
          className="bg-withe"
          onChange={(value) => handleSearch("categoryId", value)}
        />
      </div>
    </div>
  );
}
