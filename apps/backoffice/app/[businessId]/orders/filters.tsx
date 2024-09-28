"use client";

import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Filter({
  onChange,
}: {
  onChange: (value: any) => void;
}) {
  const searchParams = useSearchParams();
  const handleSearch = useDebouncedCallback((term) => {
    onChange(term);
  }, 300);
  const t = useTranslations("Order");
  return (
    <Input
      placeholder={t("phSearch")}
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get("query")?.toString()}
    />
  );
}
