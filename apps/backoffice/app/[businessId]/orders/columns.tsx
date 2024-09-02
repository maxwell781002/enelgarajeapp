import { ColumnDef } from "@repo/ui/components/table/index";
import { Badge, BadgeProps } from "@repo/ui/components/ui/badge";
import { formatDate } from "@repo/ui/lib/date";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "",
    accessorKey: "id",
    cell: ({ cell: { value: id } }: { cell: { value: string } }) => {
      return (
        <Link
          href={`orders/${id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10"
          aria-label="View"
        >
          <EyeIcon className="h-6 w-6" />
        </Link>
      );
    },
  },
  {
    header: "Identificador",
    accessorKey: "identifier",
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
    cell: ({ cell: { value: status } }: { cell: { value: string } }) => {
      const statusMap: Record<string, BadgeProps["variant"]> = {
        SENT: "outline",
        CREATED: "destructive",
      };
      return (
        <Badge
          variant={statusMap[status as keyof typeof statusMap] || "default"}
        >
          {status}
        </Badge>
      );
    },
  },
];
