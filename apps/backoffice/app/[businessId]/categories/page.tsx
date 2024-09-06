import { crud } from "@repo/model/lib/crud";
import { CategoryRepository } from "@repo/model/repositories/category";
import CategoryTable from "./table";
import { TableContextProvider } from "@repo/ui/context/table";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const { list, paginate, remove, update } = crud(
    `/${businessId}/categories`,
    CategoryRepository.name,
  );
  return (
    <TableContextProvider update={update} remove={remove}>
      <CategoryTable
        pagination={await list({ ...searchParams, businessId })}
        paginate={paginate}
      />
    </TableContextProvider>
  );
}
