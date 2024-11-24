import { ColumnDef } from "@repo/ui/components/table/index";
import { Badge } from "@repo/ui/components/ui/badge";
import { formatDate } from "@repo/ui/lib/date";
import Link from "next/link";
import { statusLabel } from "./status-label";
import { statusColors } from "@repo/model/repositories/order";

export const columns: ColumnDef<any>[] = [
  {
    header: "Identificador",
    accessorKey: "identifier",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <Link
          href={`orders/${row.id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label="View"
        >
          {value}
        </Link>
      );
    },
  },
  {
    header: "Usuario",
    accessorKey: "user.name",
  },
  {
    header: "Total",
    accessorKey: "total",
  },
  {
    header: "Enviado el",
    accessorKey: "sentAt",
    cell: ({ cell: { value: sentAt } }: { cell: { value: Date } }) => {
      return formatDate(sentAt);
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
