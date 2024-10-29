import { crud } from "@repo/model/lib/crud";
import { TableContextProvider } from "@repo/ui/context/table";
import { getTranslations } from "next-intl/server";
import {
  businessRepository,
  BusinessRepository,
} from "@repo/model/repositories/business";
import BusinessTable from "./table";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
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
  const t = await getTranslations("Business");
  const { list, remove, search } = crud(
    "/admin/business",
    businessRepository.getRepositoryModelName(),
    searchParams,
  );
  const handleSearch = async (query: any) => {
    "use server";
    const url = await search(query);
    return redirect(url);
  };
  const pagination = await list({ businessId });
  return (
    <TableLayout
      title={t("BusinessList")}
      filter={<Filter onChange={handleSearch} />}
      buttons={
        <Link href="/admin/business/form">
          <Button>{t("createBusiness")}</Button>
        </Link>
      }
    >
      <TableContextProvider remove={remove}>
        <BusinessTable pagination={pagination as PaginationResult<any>} />
      </TableContextProvider>
    </TableLayout>
  );
}
