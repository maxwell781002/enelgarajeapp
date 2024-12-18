import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useTableContext } from "@repo/ui/context/table";

export const useFilterChange = (onChange: (value: any) => void) => {
  const searchParams = useSearchParams();
  const { startListLoading } = useTableContext();
  const value: any = useMemo(
    () =>
      Array.from(searchParams.entries()).reduce((obj: any, [key, val]: any) => {
        if (val === "true" || val === "false") {
          val = val === "true" ? true : false;
        }
        return { ...(obj as any), [key]: val };
      }, {}),
    [searchParams],
  );
  const changeFilter = useDebouncedCallback((name, term) => {
    startListLoading(() => {
      return onChange({
        ...value,
        [name]: term,
      });
    });
  }, 300);

  return {
    changeFilter,
    value,
  };
};
