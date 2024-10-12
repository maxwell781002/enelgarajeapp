"use client";

import { CompleteProduct } from "@repo/model/zod/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import { startTransition, useEffect, useMemo } from "react";
import { IProduct } from "@repo/model/types/product";
import { useSearchParams } from "next/navigation";
import { getSearchParams } from "@repo/ui/lib/url";
import HasMorePaginator, {
  useHasMorePaginator,
} from "@repo/ui/components/has-more-paginator";

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
  const searchParams = useSearchParams();
  const params = useMemo(() => {
    const urlParams: any = getSearchParams(searchParams);
    const params = {
      ...urlParams,
      businessId,
    };
    return categoryId ? { ...params, categoryId } : params;
  }, [searchParams, businessId, categoryId]);
  const { reset, setList, list, updateItem, ...props } = useHasMorePaginator(
    data,
    hastMore,
    `/api/products`,
    params,
  );
  useEffect(() => reset(), [searchParams]);
  const handleAdd = (item: any) => {
    startTransition(() => {
      updateItem({ ...item, _inCart: true });
      return add(item.id);
    });
  };

  return (
    <HasMorePaginator {...props}>
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
    </HasMorePaginator>
  );
}
