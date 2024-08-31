import { ColumnDef } from "@repo/ui/components/table";
import { Badge, BadgeProps } from "@repo/ui/components/ui/badge";
import { formatDate } from "@repo/ui/lib/date";

export const columns: ColumnDef<any>[] = [
  {
    header: "identifier",
    accessorKey: "identifier",
  },
  {
    header: "user",
    accessorKey: "user.name",
  },
  {
    header: "total",
    accessorKey: "total",
  },
  {
    header: "sentAt",
    accessorKey: "sentAt",
    cell: ({ cell: { value: sentAt } }) => {
      return formatDate(sentAt);
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ cell: { value: status } }) => {
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
