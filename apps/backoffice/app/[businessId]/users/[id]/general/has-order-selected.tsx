"use client";

import { TCurrency } from "@repo/model/types/enums";
import {
  ordersIdByCurrency,
  totalToPayByCurrency,
  useStore,
} from "../useStore";
import NewInvoice from "./new-invoice";

type HasOrderSelectedProps = {
  action: (form: FormData) => void;
};

export default function HasOrderSelected({ action }: HasOrderSelectedProps) {
  const ordersToPay = useStore((state) => state.ordersToPay);
  const clearOrdersByCurrency = useStore(
    (state) => state.clearOrdersByCurrency,
  );
  const totalToPay = totalToPayByCurrency(ordersToPay);
  return (
    <>
      {Object.entries(totalToPay).map(([key, value]) => (
        <NewInvoice
          key={key}
          action={async (...props) => {
            await action(...props);
            clearOrdersByCurrency(key as TCurrency);
          }}
          totalToPay={(value as number) ?? 0}
          currency={key as TCurrency}
          ordersId={ordersIdByCurrency(ordersToPay, key as TCurrency)}
        />
      ))}
    </>
  );
}
