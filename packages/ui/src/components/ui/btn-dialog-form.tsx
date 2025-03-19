"use client";

import React, { useState } from "react";

import { Button, ButtonProps } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";

export type FormProps<T> = {
  action: (formData: any) => Promise<void>;
} & T;

export type BtnDialogFormProps = {
  title: string;
  btnIcon?: React.ReactNode;
  btnText?: string;
  btnVariant: ButtonProps["variant"];
  Component: React.ComponentType<FormProps<any>>;
} & FormProps<any>;

export function BtnDialogForm({
  title,
  btnIcon,
  btnText,
  Component,
  action,
  btnVariant = "outline",
  ...props
}: BtnDialogFormProps): JSX.Element {
  btnText = btnText || title;
  const [open, setOpen] = useState(false);
  const handleAction = async (formData: any) => {
    await action(formData);
    setOpen(false);
  };
  const toggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <Button
        variant={btnVariant}
        onClick={toggle}
        size={btnIcon ? "icon" : "default"}
        type="button"
      >
        {btnIcon || btnText}
      </Button>
      <Dialog open={open} onOpenChange={toggle}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Component action={handleAction} {...props} toggleDialog={toggle} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
