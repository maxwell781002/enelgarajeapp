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
import { useOptimistic, useState, useTransition } from "react";

type ChangeStatusProps = {
  status: string;
  onChange: (status: string) => void;
  options: [string, string][];
};

export default function ChangeStatus({
  status,
  onChange,
  options,
}: ChangeStatusProps) {
  const [open, setOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const t = useTranslations("Order");
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(status);
  const [loading, startLoading] = useTransition();
  const handleChangeStatus = async () => {
    setOptimisticStatus(nextStatus);
    startLoading(() => onChange(nextStatus));
    setOpen(false);
  };
  const setNextStatusHandler = (status: string) => {
    setNextStatus(status);
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
