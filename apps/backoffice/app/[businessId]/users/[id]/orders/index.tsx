import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { orderRepository } from "@repo/model/repositories/order";
import { columns } from "./columns";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getTranslations } from "next-intl/server";
import { TableContextProvider } from "@repo/ui/context/table";

type PageProps = {
  searchParams: any;
  businessId: string;
  collaboratorId: string;
};

export default async function CollaboratorOrders({
  searchParams,
  businessId,
  collaboratorId,
}: PageProps) {
  const t = await getTranslations("OrderUser");
  const { list, search } = crud(
    `/${businessId}/users/${collaboratorId}`,
    orderRepository.getRepositoryModelName(),
    searchParams,
    {
      paginateMethod: "collaboratorPaginate",
    },
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const data = await list({
    businessId,
    userId: collaboratorId,
    isCollaborator: true,
  });
  return (
    <TableContextProvider>
      <TableLayout
        title={t("OrderList")}
        filter={
          <Filter
            onChange={handleSearch}
            options={orderRepository.getStatus()}
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
    </TableContextProvider>
  );
}
