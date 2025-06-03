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
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          />
        ))}
      </div>
      <Pagination {...pagination} />
    </div>
  );
}
