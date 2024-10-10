import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useFilterChange = (onChange: (value: any) => void) => {
  const searchParams = useSearchParams();
  const value: any = useMemo(
    () =>
      Array.from(searchParams.entries()).reduce(
        (obj: any, [key, val]: any) => ({ ...(obj as any), [key]: val }),
        {},
      ),
    [searchParams],
  );
  const changeFilter = useDebouncedCallback((name, term) => {
    onChange({
      ...value,
      [name]: term,
    });
  }, 300);

  return {
    changeFilter,
    value,
  };
};
