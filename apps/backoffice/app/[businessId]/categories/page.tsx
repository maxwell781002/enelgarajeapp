import { crud } from "@repo/model/lib/crud";
import { CategoryRepository } from "@repo/model/repositories/category";
import CategoryTable from "./table";
import { TableContextProvider } from "@repo/ui/context/table";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout";
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
  const t = await getTranslations("Category");
  const { list, remove, update, create, search } = crud(
    `/${businessId}/categories`,
    CategoryRepository.name,
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const pagination = await list({ ...searchParams, businessId });
  return (
    <TableLayout
      title={t("CategoryList")}
      filter={<Filter onChange={handleSearch} />}
      buttons={
        <DialogForm
          title={t("createCategory")}
          action={create}
          defaultValues={{ businessId, active: true, priority: 0 }}
        />
      }
    >
      <TableContextProvider update={update} remove={remove}>
        <CategoryTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
  // return (
  //   <Card>
  //     <CardHeader className="px-7">
  //       <div className="flex flex-1">
  //         <div>
  //           <CardTitle>{t("CategoryList")}</CardTitle>
  //         </div>
  //         <div className="flex-1 flex justify-end">
  //           <DialogForm
  //             title={t("createCategory")}
  //             action={create}
  //             defaultValues={{ businessId, active: true, priority: 0 }}
  //           />
  //         </div>
  //       </div>
  //     </CardHeader>
  //     <CardContent>
  //       <TableContextProvider update={update} remove={remove}>
  //         <CategoryTable pagination={pagination as PaginationResult<any>} />
  //       </TableContextProvider>
  //     </CardContent>
  //   </Card>
  // );
}
