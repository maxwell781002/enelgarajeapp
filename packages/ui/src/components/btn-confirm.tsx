"use client";

import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";

export type BtnConfirmProps = {
  isLoading: boolean;
  action: () => any;
  open: boolean;
  toggle?: () => void;
  textError?: string;
  textButton?: string;
  description?: string;
  title?: string;
  btnIcon?: any;
};

function BtnConfirmContent({
  isLoading,
  action,
  description,
  textButton,
  textError,
}: BtnConfirmProps) {
  const [showError, setShowError] = useState<boolean>(false);
  const doAction = async () => {
    setShowError(false);
    await action();
  };
  return (
    <>
      {description}
      <Button loading={isLoading} variant={"default"} onClick={doAction}>
        {textButton}
      </Button>
      {showError && <p className="text-red-500">{textError}</p>}
    </>
  );
}

export default function BtnConfirm({
  action,
  toggle,
  open,
  ...props
}: Omit<BtnConfirmProps, "actionConfirm"> & {
  action: (onSuccess?: () => void, onError?: () => void) => any;
}) {
  return (
    <BtnDialogForm
      Component={BtnConfirmContent}
      btnVariant={"destructive"}
      action={action}
      toggle={toggle}
      open={open}
      {...props}
    />
  );
}
