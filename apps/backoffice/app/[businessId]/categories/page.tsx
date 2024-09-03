import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { columns } from "./columns";
import { CategoryRepository } from "@repo/model/repositories/category";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const { list, paginate } = crud(
    `/${businessId}/categories`,
    CategoryRepository.name,
  );
  return (
    <MyTable
      pagination={await list({ ...searchParams, businessId })}
      columns={columns}
      paginate={paginate}
      emptyTitle="No hay categorias"
      emptyDescription="No has creado ninguna categoria todavía."
    />
  );
}
