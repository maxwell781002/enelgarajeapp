"use client";
import { CompleteOrder } from "@repo/model/zod/order";
import CheckButton from "@repo/ui/components/button-check";
import { useStore } from "../useStore";

export type AddToInvoiceProps = {
  row: CompleteOrder;
};

export default function AddToInvoice({ row }: AddToInvoiceProps) {
  const isOrderInList = useStore((state) => state.isOrderInList(row));
  const addOrRemoveOrder = useStore((state) => state.addOrRemoveOrder);
  return (
    <div className="pr-2">
      <CheckButton
        checked={isOrderInList}
        onClick={() => addOrRemoveOrder(row)}
      />
    </div>
  );
}
