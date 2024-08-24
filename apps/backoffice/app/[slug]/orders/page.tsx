import MyTable, { ColumnDef } from "@repo/ui/components/table";
import { Badge, BadgeProps } from "@repo/ui/components/ui/badge";
import { crud } from "../../../../../packages/model/lib/crud";
import { OrderRepository } from "@repo/model/repositories/order";

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

type PageProps = {
  searchParams: any;
};

export default async function Page({ searchParams }: PageProps) {
  const { list, paginate, create, update, remove } = crud(
    "/post",
    OrderRepository.name,
  );
  const a = await list(searchParams);
  console.log(a);
  return (
    <MyTable
      pagination={await list(searchParams)}
      columns={columns}
      currentPage={1}
      totalPages={1}
    />
  );
}
