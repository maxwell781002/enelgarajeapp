import MyTable from "@repo/ui/components/table";
import { crud } from "@repo/model/lib/crud";
import { OrderRepository } from "@repo/model/repositories/order";
import { columns } from "./columns";

type PageProps = {
  searchParams: any;
};

export default async function Page({ searchParams }: PageProps) {
  const { list, paginate } = crud("/aaa/orders", OrderRepository.name);
  return (
    <MyTable
      pagination={await list(searchParams)}
      columns={columns}
      paginate={paginate}
    />
  );
}
