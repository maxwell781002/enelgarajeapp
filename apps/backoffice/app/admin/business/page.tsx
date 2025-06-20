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
import TableLayout from "@repo/ui/components/table-layout/layout";
import Filter from "./filters";
import { redirect } from "next/navigation";

type PageProps = {
  searchParams: Promise<any>;
  params: Promise<{ businessId: string }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const { businessId } = await params;
  searchParams = await searchParams;
  const t = await getTranslations("Business");
  if ((searchParams as any).active === undefined) {
    return redirect(`/admin/business?active=${true}`);
  }
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
    <TableContextProvider remove={remove}>
      <TableLayout
        title={t("BusinessList")}
        filter={<Filter onChange={handleSearch} />}
        buttons={
          <Link href="/admin/business/form">
            <Button>{t("createBusiness")}</Button>
          </Link>
        }
      >
        <BusinessTable pagination={pagination as PaginationResult<any>} />
      </TableLayout>
    </TableContextProvider>
  );
}
