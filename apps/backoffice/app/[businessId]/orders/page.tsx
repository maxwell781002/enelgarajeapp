import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { OrderRepository } from "@repo/model/repositories/order";
import { columns } from "./columns";
import Filter from "./filters";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const { list, paginate, search } = crud(
    `/${businessId}/orders`,
    OrderRepository.name,
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search({ query });
    return redirect(url);
  };
  const data = await list({ businessId });
  return (
    <>
      <Filter onChange={handleSearch} />
      <MyTable
        pagination={data}
        columns={columns}
        paginate={paginate}
        emptyTitle="No hay órdenes"
        emptyDescription="No has tenido ninguna compra todavía."
      />
    </>
  );
}
