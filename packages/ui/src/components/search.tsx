"use client";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useFilterChange } from "@repo/ui/hooks/useFilterChange";

type SearchInputType = {
  className?: string;
  onChange: (value: any) => void;
};

export default function SearchInput({ className, onChange }: SearchInputType) {
  const { changeFilter, value } = useFilterChange(onChange);
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Input
        type="text"
        placeholder="Buscar..."
        onChange={(e) => changeFilter("query", e.target.value)}
        defaultValue={value.query?.toString()}
        className="w-full pr-20 border-green-500 hover:border-green-600 focus-visible:border-green-600  focus-visible:ring-0" // Add padding to the right to accommodate the button
      />
      <Button
        type="submit"
        className="absolute right-0 top-0 bottom-0 rounded-l-none bg-green-500 hover:bg-green-600"
        aria-label="Search"
      >
        <SearchIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
