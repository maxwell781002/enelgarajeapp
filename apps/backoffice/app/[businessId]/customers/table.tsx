"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { columns } from "./columns";

export default function CustomersTable(
  props: Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">,
) {
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay clientes"
      emptyDescription="No tienes registrado ningún cliente todavía."
    />
  );
}
