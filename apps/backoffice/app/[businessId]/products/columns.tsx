import Image from "@repo/ui/components/image";
import { ColumnDef } from "@repo/ui/components/table/index";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <Link
          href={`products/${row.id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label="View"
        >
          <Image src={row.image} width={48} height={48} alt={row.name} />
        </Link>
      );
    },
  },
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) => {
      return (
        <Link
          href={`products/${row.id}`}
          className="bg-white hover:bg-gray-100 text-gray-800 h-10 w-10 text-blue-500 underline hover:text-blue-700 transition-colors"
          aria-label="View"
        >
          {value}
        </Link>
      );
    },
  },
  {
    header: "Stock",
    accessorKey: "stock",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value,
  },
  {
    header: "Prioridad",
    accessorKey: "priority",
    cell: ({ cell: { value, row } }: { cell: { value: string; row: any } }) =>
      value,
  },
];
