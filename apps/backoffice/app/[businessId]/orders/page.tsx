import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { orderRepository } from "@repo/model/repositories/order";
import { getColumns } from "./columns";
import Filter from "./filters";
import { redirect } from "next/navigation";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getTranslations } from "next-intl/server";
import { TableContextProvider } from "@repo/ui/context/table";
import { getBusinessById } from "packages/model/repository/business";

type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{ businessId: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { businessId } = await params;
  searchParams = await searchParams;
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
  const business = await getBusinessById(businessId);
  const data = await list({ businessId });
  const columns = getColumns(business?.hasWholesaleMode);
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
