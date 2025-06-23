import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useTableContext } from "@repo/ui/context/table";

export const useFilterChange = (
  onChange: (value: any) => void,
  startLoading: (() => void) | null = null,
) => {
  const searchParams = useSearchParams();
  const { startListLoading } = useTableContext();
  startLoading = startLoading || startListLoading;
  const value: any = Array.from(searchParams.entries()).reduce(
    (obj: any, [key, val]: any) => {
      if (val === "true" || val === "false") {
        val = val === "true" ? true : false;
      }
      return { ...(obj as any), [key]: val };
    },
    {},
  );
  const changeNow = (name: string, term: string) => {
    (startLoading as any)(() => {
      return onChange({
        ...value,
        [name]: term,
      });
    });
  };
  const changeFilter = useDebouncedCallback(changeNow, 300);

  return {
    changeFilter,
    changeNow,
    value,
  };
};
