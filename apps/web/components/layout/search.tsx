"use client";

import React from "react";
import { MagnifyingGlassIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";
import { useProductContext } from "apps/web/context/product-context";
import { Input } from "@repo/ui/components/ui/input";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export type SearchBarProps = {
  locale: string;
};

const SearchBar = ({ locale }: SearchBarProps) => {
  const t = useTranslations("Header");
  const { startListLoading } = useProductContext();
  const route = useRouter();
  const { changeFilter, value } = useFilterChange((query) => {
    const url = `/${locale}/?${new URLSearchParams({ ...query })}`;
    route.push(url);
  }, startListLoading);
  const [search, setSearch] = React.useState(value.query?.toString() || "");
  const handleChange = (value: string) => {
    setSearch(value);
    changeFilter("query", value);
  };
  return (
    <form className="border border-border dark:border-darkmode-border rounded-full flex bg-light/90 dark:bg-dark/10 pl-4 relative">
      <Input
        type="text"
        name="search"
        placeholder={t("search")}
        autoComplete="off"
        id="searchInput"
        className="bg-transparent border-none search-input focus:ring-transparent p-2 w-full"
        onChange={(e) => handleChange(e.target.value)}
        value={search}
      />
      <div className="absolute right-0 top-0 flex h-full items-center">
        {!!search && (
          <button
            onClick={() => handleChange("")}
            type="button"
            className="p-2 m-1 rounded-full"
          >
            <Cross1Icon className="h-4 w-4" />
          </button>
        )}
        <button type="submit" className="search-icon p-2 m-1 rounded-full">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
