import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { orderRepository } from "@repo/model/repositories/order";
import { columns } from "./columns";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getTranslations } from "next-intl/server";
import { TableContextProvider } from "@repo/ui/context/table";

type PageProps = {
  businessId: string;
  userId: string;
};

export default async function CustomerOrders({
  businessId,
  userId,
}: PageProps) {
  const t = await getTranslations("Customers");
  const { list } = crud(
    `/${businessId}/customers/${userId}`,
    orderRepository.getRepositoryModelName(),
    {
      pageSize: 100,
    },
    {
      paginateMethod: "customerPaginate",
    },
  );
  const data = await list({
    businessId,
    userId,
    isCollaborator: false,
  });
  return (
    <TableContextProvider>
      <TableLayout title={t("OrderList")}>
        <MyTable
          pagination={data as PaginationResult<any>}
          columns={columns}
          emptyTitle="No hay órdenes"
          emptyDescription="No ha tenido ninguna compra todavía."
        />
      </TableLayout>
    </TableContextProvider>
  );
}
