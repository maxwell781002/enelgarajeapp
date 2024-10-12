import { PropsWithChildren, useCallback, useState } from "react";
import ScrollTop from "./scroll-top";
import ShowMore from "@repo/ui/components/show-more";

export const useHasMorePaginator = (
  data: any,
  hasMore: boolean,
  url: string,
  urlParams: any,
) => {
  const [list, setList] = useState(data);
  const [currentHastMore, setCurrentHastMore] = useState(hasMore);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const handleGetMore = useCallback(async () => {
    setLoading(true);
    const params: any = {
      ...urlParams,
      pageIndex: page + 1,
    };
    const route = `${url}?${new URLSearchParams(params)}`;
    const data = await fetch(route).then((res) => res.json());
    setList([...list, ...data.data]);
    setCurrentHastMore(data.hasMore);
    setPage(page + 1);
    setLoading(false);
  }, [url, page, list, urlParams]);

  const reset = useCallback(() => {
    setList(data);
    setCurrentHastMore(hasMore);
    setLoading(false);
    setPage(1);
  }, [data, hasMore]);

  const updateItem = useCallback((item: any) => {
    setList((prev: any) => prev.map((i: any) => (i.id === item.id ? item : i)));
  }, []);

  return {
    setList,
    list,
    hasMore: currentHastMore,
    loading,
    page,
    handleGetMore,
    reset,
    updateItem,
  };
};

export type HasMorePaginatorProps = {
  hasMore: boolean;
  handleGetMore: () => void;
  loading: boolean;
} & PropsWithChildren;

export default function HasMorePaginator({
  children,
  hasMore,
  handleGetMore,
  loading,
}: HasMorePaginatorProps) {
  return (
    <ScrollTop>
      {children}
      {hasMore && (
        <div className="w-full flex flex-1 justify-end border-solid border-1 border-gray-300">
          <ShowMore onClick={handleGetMore} disabled={loading}>
            Ver más
          </ShowMore>
        </div>
      )}
    </ScrollTop>
  );
}
