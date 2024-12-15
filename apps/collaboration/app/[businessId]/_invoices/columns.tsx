import { ColumnDef } from "@repo/ui/components/table/index";
import { formatDate } from "@repo/ui/lib/date";
import PriceDisplay from "@repo/ui/components/prices/price";
import { Check, CircleX } from "lucide-react";
import { BtnList } from "@repo/ui/components/ui/btn-list";
import { useTranslations } from "next-intl";
import { CompleteCollaboratorInvoice } from "@repo/model/zod/collaboratorinvoice";
import { useTableContext } from "@repo/ui/context/table";
import { BtnConfirm } from "@repo/ui/components/ui/btn-confirm";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";

type ActionProps = {
  row: CompleteCollaboratorInvoice;
};

function RowActions({ row }: ActionProps) {
  const { confirmInvoice } = useTableContext();
  const t = useTranslations("CollaboratorInvoice");
  if (row.confirmed) {
    return;
  }
  return (
    <BtnList>
      <BtnConfirm
        action={() => confirmInvoice(row.id)}
        title={t("confirmInvoice")}
        description={t("confirmInvoiceDescription")}
        btnContinueText={t("confirmInvoiceContinue")}
        btnCancelText={t("confirmInvoiceCancel")}
        btnIcon={<Check />}
      />
    </BtnList>
  );
}

export const columns: ColumnDef<any>[] = [
  {
    header: "Código de transferencia",
    accessorKey: "transferCode",
  },
  {
    header: "Total",
    accessorKey: "amount",
    cell: ({ cell: { value, row } }: { cell: { value: number; row: any } }) => {
      return (
        <PriceDisplay
          price={value}
          currency={row.currency}
          classNameText="text-sm"
        />
      );
    },
  },
  {
    header: "Tarjeta",
    accessorKey: "cardBank",
    cell: ({
      cell: { value, row },
    }: {
      cell: { value: CompleteCollaboratorCardBank; row: any };
    }) => value.cardNumber,
  },
  {
    header: "Confirmado",
    accessorKey: "confirmed",
    cell: ({
      cell: { value: confirmed, row },
    }: {
      cell: { value: boolean; row: any };
    }) => {
      return (
        <>
          {confirmed ? (
            <Check className="text-green-500 inline-block w-4 h-4" />
          ) : (
            <CircleX className="text-red-500 inline-block w-4 h-4" />
          )}
        </>
      );
    },
  },
  {
    header: "Enviado el",
    accessorKey: "createdAt",
    cell: ({
      cell: { value: createdAt, row },
    }: {
      cell: { value: Date; row: any };
    }) => {
      return formatDate(createdAt);
    },
  },
  {
    header: "Acciones",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return <RowActions row={row} />;
    },
  },
];
