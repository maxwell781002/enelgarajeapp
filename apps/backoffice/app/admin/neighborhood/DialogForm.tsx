"use client";

import { useToggle } from "@repo/ui/hooks/useToggle";
import Form from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";

export function DialogForm({
  ...props
}: Omit<BtnDialogFormProps, "Component" | "btnVariant" | "open" | "toggle">) {
  const [open, toggle] = useToggle();
  return (
    <BtnDialogForm
      Component={Form}
      {...props}
      btnVariant={"default"}
      toggle={toggle}
      open={open}
    />
  );
}
