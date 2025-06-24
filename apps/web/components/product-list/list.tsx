"use client";

import { CompleteProduct } from "@repo/model/zod/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getSearchParams } from "@repo/model/lib/url";
import HasMorePaginator, {
  useHasMorePaginator,
} from "@repo/ui/components/has-more-paginator";

export type ProductListProps = {
  data: CompleteProduct[];
  businessId: string;
  hastMore: boolean;
};

export default function ProductList({
  data,
  businessId,
  hastMore,
}: ProductListProps) {
  const searchParams = useSearchParams();
  const params = useMemo(() => {
    const urlParams: any = getSearchParams(searchParams);
    return {
      ...urlParams,
      businessId,
    };
  }, [searchParams, businessId]);
  const { reset, setList, list, updateItem, ...props } = useHasMorePaginator(
    data,
    hastMore,
    `/api/products`,
    params,
  );
  useEffect(() => reset(), [searchParams]);

  return (
    <HasMorePaginator {...props}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item: any) => (
          <CardItem key={item.id} item={item} baseUrl={""} />
        ))}
      </div>
    </HasMorePaginator>
  );
}
