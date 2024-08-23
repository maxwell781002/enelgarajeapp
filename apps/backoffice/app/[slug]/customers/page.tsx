import MyTable, { ColumnDef } from "@repo/ui/components/table";
import { Badge, BadgeProps } from "@repo/ui/components/ui/badge";

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Developer",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Designer",
    status: "Inactive",
    lastActive: "1 day ago",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Manager",
    status: "Active",
    lastActive: "5 minutes ago",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Tester",
    status: "Pending",
    lastActive: "3 days ago",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Developer",
    status: "Active",
    lastActive: "1 hour ago",
  },
];

const columns: ColumnDef<any>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Role",
    accessorKey: "role",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ cell: { value: status } }) => {
      const statusMap: Record<string, BadgeProps["variant"]> = {
        Active: "outline",
        Inactive: "destructive",
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
  {
    header: "Last Active",
    accessorKey: "lastActive",
  },
];

export default function Page() {
  return (
    <MyTable data={data} columns={columns} currentPage={1} totalPages={1} />
  );
}
