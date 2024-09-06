"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { columns } from "./columns";

export default function CategoryTable(
  props: Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">,
) {
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay categorias"
      emptyDescription="No has creado ninguna categoria todavía."
    />
  );
}
