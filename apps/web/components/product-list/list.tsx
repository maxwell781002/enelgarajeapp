"use client";

import { CompleteProduct } from "@repo/model/zod/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import { startTransition, useCallback, useOptimistic, useState } from "react";
import ShowMore from "@repo/ui/components/show-more";
import { useTranslations } from "next-intl";
import { ProductShopCartItem } from "@repo/model/repository/order";

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
  const t = useTranslations("Product");
  const handleGetMore = useCallback(async () => {
    setLoading(true);
    let route = `/api/products?businessId=${businessId}&page=${page + 1}`;
    if (categoryId) {
      route = route + `&categoryId=${categoryId}`;
    }
    const data = await fetch(route).then((res) => res.json());
    setList([...list, ...data.data]);
    setCurrentHastMore(data.hasMore);
    setPage(page + 1);
    setLoading(false);
  }, [categoryId, businessId, page, list]);

  const handleAdd = (item: any) => {
    startTransition(() => {
      setList((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, _inCart: true } : i)),
      );
      return add(item.id);
    });
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item: any) => (
          <CardItem
            onAdd={() => handleAdd(item)}
            key={item.id}
            item={
              {
                ...item,
                _inCart: item._inCart,
              } as ProductShopCartItem
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
    </>
  );
}
