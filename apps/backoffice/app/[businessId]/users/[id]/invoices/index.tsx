import MyTable from "@repo/ui/components/table/index";
import { crud } from "@repo/model/lib/crud";
import { columns } from "./columns";
import { PaginationResult } from "@repo/model/types/pagination";
import TableLayout from "@repo/ui/components/table-layout/layout";
import { getTranslations } from "next-intl/server";
import { TableContextProvider } from "@repo/ui/context/table";
import { collaboratorInvoiceRepository } from "@repo/model/repositories/collaborator-invoice";

type PageProps = {
  businessId: string;
  collaboratorId: string;
};

export default async function CollaboratorInvoice({
  businessId,
  collaboratorId,
}: PageProps) {
  const t = await getTranslations("CollaboratorInvoice");
  const { list } = crud(
    `/${businessId}/users/${collaboratorId}`,
    collaboratorInvoiceRepository.getRepositoryModelName(),
  );
  const data = await list({
    businessId,
    collaboratorId,
  });
  return (
    <TableContextProvider>
      <TableLayout title={t("InvoiceList")}>
        <MyTable
          pagination={data as PaginationResult<any>}
          columns={columns}
          emptyTitle="No hay facturas"
          emptyDescription="No has tenido ninguna factura todavía."
        />
      </TableLayout>
    </TableContextProvider>
  );
}
