import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { columns } from "./columns";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getTranslations } from "next-intl/server";
import { TableContextProvider } from "@repo/ui/context/table";
import { collaboratorInvoiceRepository } from "@repo/model/repositories/collaborator-invoice";
import InvoiceTable from "./table";
import { revalidatePath } from "next/cache";
import { confirmInvoice } from "@repo/model/repository/collaborator-invoice";

type PageProps = {
  searchParams: any;
  businessId: string;
  collaboratorId: string;
};

export default async function CollaboratorInvoice({
  searchParams,
  businessId,
  collaboratorId,
}: PageProps) {
  const t = await getTranslations("CollaboratorInvoice");
  const { list } = crud(
    `/${businessId}/users/${collaboratorId}`,
    collaboratorInvoiceRepository.getRepositoryModelName(),
  );
  const pagination = await list({
    ...searchParams,
    businessId,
    collaboratorId,
  });
  const actionConfirmInvoice = async (id: string) => {
    "use server";
    await confirmInvoice(id);
    return revalidatePath(`/${businessId}`);
  };
  return (
    <TableContextProvider confirmInvoice={actionConfirmInvoice}>
      <TableLayout title={t("InvoiceList")}>
        <InvoiceTable pagination={pagination as PaginationResult<any>} />
      </TableLayout>
    </TableContextProvider>
  );
}
