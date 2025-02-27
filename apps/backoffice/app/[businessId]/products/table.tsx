"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { getColumns } from "./columns";
import { CompleteBusiness } from "@repo/model/zod/index";

export type ProductTableProps = {
  business: CompleteBusiness;
} & Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">;

export default function ProductTable({
  business,
  ...props
}: ProductTableProps) {
  const columns = getColumns(business.canConnectWhatsapp as boolean);
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay productos"
      emptyDescription="No has creado ninguò producto todavía."
    />
  );
}
