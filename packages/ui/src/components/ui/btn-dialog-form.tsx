"use client";

import React, { useCallback, useState } from "react";

import { Button, ButtonProps } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";

type Form = React.ComponentType<{
  action: any;
  defaultValues: any;
}>;

export type BtnDialogFormProps = {
  action: (object: any) => Promise<any>;
  defaultValues: any;
  title: string;
  btnIcon?: React.ReactNode;
  btnText?: string;
  btnVariant: ButtonProps["variant"];
  Component: Form;
};

export function BtnDialogForm({
  action,
  title,
  btnIcon,
  btnText,
  Component,
  defaultValues,
  btnVariant = "outline",
}: BtnDialogFormProps): JSX.Element {
  btnText = btnText || title;
  const [open, setOpen] = useState(false);
  const handleAction = useCallback(
    async (props: any) => {
      await action(props);
      setOpen(false);
    },
    [action],
  );
  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Button
        variant={btnVariant}
        onClick={handleOpen}
        size={btnIcon ? "icon" : "default"}
      >
        {btnIcon || btnText}
      </Button>
      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Component action={handleAction} defaultValues={defaultValues} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
