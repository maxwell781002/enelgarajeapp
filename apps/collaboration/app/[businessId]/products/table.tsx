"use client";
import { PaginationResult } from "@repo/model/types/pagination";
import { IProduct } from "@repo/model/types/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import Pagination from "@repo/ui/components/table/pagination";

export default function ProductTable({
  pagination: { data, ...pagination },
  add,
  baseUrl,
}: {
  pagination: PaginationResult<any>;
  add: (productId: string) => void;
  baseUrl: string;
}) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item: any) => (
          <CardItem
            onAdd={() => add(item.id)}
            key={item.id}
            item={
              {
                ...item,
                _inCart: item._inCart,
              } as IProduct
            }
            baseUrl={baseUrl}
          />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
