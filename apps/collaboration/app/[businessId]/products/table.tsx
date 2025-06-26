"use client";
import { PaginationResult } from "@repo/model/types/pagination";
import { IProduct } from "@repo/model/types/product";
import { CardItem } from "@repo/ui/components/cardList/card";
import EmptyTable from "@repo/ui/components/table/empty";
import Pagination from "@repo/ui/components/table/pagination";

export default function ProductTable({
  pagination: { data, ...pagination },
  baseUrl,
}: {
  pagination: PaginationResult<any>;
  baseUrl: string;
}) {
  if (data.length === 0) {
    return (
      <EmptyTable
        emptyTitle="No hay productos"
        emptyDescription="No hay productos disponibles o no hay para los filtros seleccionados."
      />
    );
  }
  return (
    <div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {data.map((item: any) => (
          <CardItem
            showStock
            showCommission
            showSku
            key={item.id}
            item={
              {
                ...item,
                _inCart: item._inCart,
              } as IProduct
            }
            baseUrl={baseUrl}
            imageProps={{
              width: 0,
              height: 0,
              sizes: "100vw",
              style: { width: "100%", height: "auto" },
              className: "w-full h-full object-cover"
            }}
          />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
