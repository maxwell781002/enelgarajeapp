import { crud } from "@repo/model/lib/crud";
import { CategoryRepository } from "@repo/model/repositories/category";
import CategoryTable from "./table";

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
    <CategoryTable
      pagination={await list({ ...searchParams, businessId })}
      paginate={paginate}
    />
  );
}
