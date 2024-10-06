import { crud } from "@repo/model/lib/crud";
import { CategoryRepository } from "@repo/model/repositories/category";
import CategoryTable from "./table";
import { TableContextProvider } from "@repo/ui/context/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { DialogForm } from "./DialogForm";
import { getTranslations } from "next-intl/server";

type PageProps = {
  searchParams: any;
  params: { businessId: string };
};

export default async function Page({
  searchParams,
  params: { businessId },
}: PageProps) {
  const t = await getTranslations("Category");
  const { list, remove, update, create } = crud(
    `/${businessId}/categories`,
    CategoryRepository.name,
    searchParams,
  );
  return (
    <Card>
      <CardHeader className="px-7">
        <div className="flex flex-1">
          <div>
            <CardTitle>{t("CategoryList")}</CardTitle>
          </div>
          <div className="flex-1 flex justify-end">
            <DialogForm
              title={t("createCategory")}
              action={create}
              defaultValues={{ businessId }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <TableContextProvider update={update} remove={remove}>
          <CategoryTable
            pagination={await list({ ...searchParams, businessId })}
          />
        </TableContextProvider>
      </CardContent>
    </Card>
  );
}
