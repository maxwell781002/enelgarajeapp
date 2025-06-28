"use client";

import StatusSelect from "@repo/ui/components/status/status-select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { OrderStatus } from "@repo/model/types/enums";
import { useOptimistic, useState, useTransition } from "react";
import { useGTMEvent } from "@repo/ui/components/google-analytics/hook";
import { CompleteOrder } from "@repo/model/zod/order";

type ChangeStatusProps = {
  status: string;
  onChange: (status: string) => void;
  options: [string, string][];
  order: CompleteOrder;
};

const orderToGTMEvent = {
  [OrderStatus.PAYED]: "purchase",
  [OrderStatus.REJECTED]: "order_rejected",
};

type OrderStatusAllowed =
  | typeof OrderStatus.PAYED
  | typeof OrderStatus.REJECTED
  | "";

export default function ChangeStatus({
  status,
  onChange,
  options,
  order,
}: ChangeStatusProps) {
  const [open, setOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<OrderStatusAllowed>("");
  const t = useTranslations("Order");
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const [loading, startLoading] = useTransition();
  const { sendEvent } = useGTMEvent();
  const handleChangeStatus = async () => {
    startLoading(async () => {
      setOptimisticStatus(nextStatus);
      await onChange(nextStatus);
      const eventGTM =
        orderToGTMEvent[nextStatus as keyof typeof orderToGTMEvent];
      console.log(eventGTM, nextStatus);
      if (eventGTM) {
        sendEvent({
          event: eventGTM,
          cartItems: order.items,
          order,
        });
      }
    });
    setOpen(false);
  };
  const setNextStatusHandler = (status: string) => {
    setNextStatus(status as OrderStatusAllowed);
    setOpen(true);
  };
  return (
    <>
      <StatusSelect
        status={optimisticStatus}
        onChange={setNextStatusHandler}
        options={options}
        disabled={loading}
      />
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("titleChangeStatus")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("descriptionChangeStatus")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              {t("btnChangeStatusCancelText")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleChangeStatus} disabled={loading}>
              {t("btnChangeStatusContinueText")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
