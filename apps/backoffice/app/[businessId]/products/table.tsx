"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { columns } from "./columns";

export default function ProductTable(
  props: Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">,
) {
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay productos"
      emptyDescription="No has creado ninguò producto todavía."
    />
  );
}
