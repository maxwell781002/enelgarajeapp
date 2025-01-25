import { ColumnDef } from "@repo/ui/components/table/index";
import { Badge } from "@repo/ui/components/ui/badge";
import { formatDate } from "@repo/model/lib/date";
import { statusLabel } from "@repo/ui/components/status/status-label";
import { statusColors } from "@repo/model/repositories/order";
import PriceDisplay from "@repo/ui/components/prices/price";
import AddToInvoice from "./addToInvoice";
import BooleanValue from "@repo/ui/components/boolean-value";

export const columns: ColumnDef<any>[] = [
  {
    header: "Identificador",
    accessorKey: "identifier",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return value;
    },
  },
  {
    header: "Total",
    accessorKey: "total",
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
    header: "Comisión",
    accessorKey: "commission",
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
    header: "Negocio",
    accessorKey: "businessProfit",
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
    header: "Enviado el",
    accessorKey: "sentAt",
    cell: ({
      cell: { value: sentAt, row },
    }: {
      cell: { value: Date; row: any };
    }) => {
      return formatDate(sentAt);
    },
  },
  {
    header: "¿Es referido?",
    accessorKey: "referredById",
    cell: ({
      cell: { value: referredById, row },
    }: {
      cell: { value: string; row: any };
    }) => {
      return (
        <BooleanValue value={!!referredById} />
      );
    },
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({
      cell: { value: status, row },
    }: {
      cell: { value: string; row: any };
    }) => {
      return (
        <Badge
          className={`${statusColors[status as keyof typeof statusColors]}`}
        >
          {statusLabel(status)}
        </Badge>
      );
    },
  },
  {
    header: "",
    accessorKey: "status",
    cell: ({
      cell: { value: status, row },
    }: {
      cell: { value: string; row: any };
    }) => {
      return <AddToInvoice row={row} />;
    },
  },
];
