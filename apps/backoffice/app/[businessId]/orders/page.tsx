import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import {
  orderRepository,
  OrderRepository,
} from "@repo/model/repositories/order";
import { columns } from "./columns";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Order");
  const { list, search } = crud(
    `/${businessId}/orders`,
    orderRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const data = await list({ businessId });
  return (
    <TableLayout
      title={t("OrderList")}
      filter={
        <Filter
          onChange={handleSearch}
          options={orderRepository.orderToChange()}
        />
      }
    >
      <MyTable
        pagination={data as PaginationResult<any>}
        columns={columns}
        emptyTitle="No hay órdenes"
        emptyDescription="No has tenido ninguna compra todavía."
      />
    </TableLayout>
  );
}
