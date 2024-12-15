import { ColumnDef } from "@repo/ui/components/table/index";
import { formatDate } from "@repo/ui/lib/date";
import PriceDisplay from "@repo/ui/components/prices/price";
import { Check, CircleX } from "lucide-react";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";

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
];
