import { ColumnDef } from "@repo/ui/components/table/index";
import { formatDate } from "@repo/model/lib/date";
import PriceDisplay from "@repo/ui/components/prices/price";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";
import ActiveInactive from "@repo/ui/components/active-inactive";

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
      return <ActiveInactive active={confirmed} />;
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
