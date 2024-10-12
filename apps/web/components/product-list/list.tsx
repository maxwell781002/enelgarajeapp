"use client";

import { CompleteProduct } from "@repo/model/zod/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import { startTransition, useCallback, useEffect, useState } from "react";
import ShowMore from "@repo/ui/components/show-more";
import { useTranslations } from "next-intl";
import ScrollTop from "@repo/ui/components/scroll-top";
import { IProduct } from "@repo/model/types/product";
import { useSearchParams } from "next/navigation";
import { getSearchParams } from "@repo/ui/lib/url";

export type ProductListProps = {
  data: CompleteProduct[];
  add: (productId: string) => void;
  categoryId: string;
  businessId: string;
  hastMore: boolean;
};

export default function ProductList({
  data,
  add,
  businessId,
  categoryId,
  hastMore,
}: ProductListProps) {
  const [list, setList] = useState(data);
  const [currentHastMore, setCurrentHastMore] = useState(hastMore);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  useEffect(() => {
    setList(data);
    setCurrentHastMore(hastMore);
    setLoading(false);
    setPage(1);
  }, [searchParams]);
  const t = useTranslations("Product");
  const handleGetMore = useCallback(async () => {
    setLoading(true);
    const urlParams: any = getSearchParams(searchParams);
    const params: any = {
      ...urlParams,
      businessId,
      pageIndex: page + 1,
    };
    if (categoryId) {
      params.categoryId = categoryId;
    }
    const route = `/api/products?${new URLSearchParams(params)}`;
    const data = await fetch(route).then((res) => res.json());
    setList([...list, ...data.data]);
    setCurrentHastMore(data.hasMore);
    setPage(page + 1);
    setLoading(false);
  }, [categoryId, businessId, page, list, searchParams]);

  const handleAdd = (item: any) => {
    startTransition(() => {
      setList((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, _inCart: true } : i)),
      );
      return add(item.id);
    });
  };

  return (
    <ScrollTop>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item: any) => (
          <CardItem
            onAdd={() => handleAdd(item)}
            key={item.id}
            item={
              {
                ...item,
                _inCart: item._inCart,
              } as IProduct
            }
            baseUrl={""}
          />
        ))}
      </div>
      {currentHastMore && (
        <div className="w-full flex flex-1 justify-end border-solid border-1 border-gray-300">
          <ShowMore onClick={handleGetMore} disabled={loading}>
            {t("moreProducts")}
          </ShowMore>
        </div>
      )}
    </ScrollTop>
  );
}
