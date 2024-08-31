import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { OrderRepository } from "@repo/model/repositories/order";
import { columns } from "./columns";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const { list, paginate } = crud("/aaa/orders", OrderRepository.name);
  return (
    <MyTable
      pagination={await list({ ...searchParams, businessId })}
      columns={columns}
      paginate={paginate}
      emptyTitle="No hay órdenes"
      emptyDescription="No has tenido ninguna compra todavía."
    />
  );
}
