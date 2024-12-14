"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { columns } from "./columns";

export default function InvoiceTable(
  props: Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">,
) {
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay facturas"
      emptyDescription="No has tenido ninguna factura todavía."
    />
  );
}
