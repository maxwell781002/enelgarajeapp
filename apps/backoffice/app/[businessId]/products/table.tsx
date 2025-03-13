"use client";

import MyTable, { MyTableProps } from "@repo/ui/components/table/index";
import { getColumns } from "./columns";
import {
  CompleteBusiness,
  CompleteWhatsappConnect,
} from "@repo/model/zod/index";
import { WhatsappConnectStatus } from "@repo/model/types/enums";

export type ProductTableProps = {
  business: CompleteBusiness;
  whatsappConnect: CompleteWhatsappConnect | null;
} & Omit<MyTableProps, "columns" | "emptyTitle" | "emptyDescription">;

export default function ProductTable({
  business,
  whatsappConnect,
  ...props
}: ProductTableProps) {
  const columns = getColumns(
    (business.canConnectWhatsapp as boolean) &&
      whatsappConnect?.status === WhatsappConnectStatus.CONNECTED,
  );
  return (
    <MyTable
      {...props}
      columns={columns}
      emptyTitle="No hay productos"
      emptyDescription="No has creado ninguò producto todavía."
    />
  );
}
