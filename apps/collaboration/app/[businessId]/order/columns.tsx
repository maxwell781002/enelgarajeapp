import { ColumnDef } from "@repo/ui/components/table/index";
import { Badge } from "@repo/ui/components/ui/badge";
import { formatDate } from "@repo/model/lib/date";
import Link from "next/link";
import { statusLabel } from "@repo/ui/components/status/status-label";
import { statusColors } from "@repo/model/repositories/order";
import PriceDisplay from "@repo/ui/components/prices/price";
import BooleanValue from "@repo/ui/components/boolean-value";

export const columns: ColumnDef<any>[] = [
  {
    header: "Identificador",
    accessorKey: "identifier",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <Link
          href={`order/${row.id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label="View"
        >
          {value}
        </Link>
      );
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
      return <BooleanValue value={!!referredById} />;
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
];
