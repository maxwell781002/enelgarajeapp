"use client";

import Form, { FormAction } from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";
import { useToggle } from "@repo/ui/hooks/useToggle";

export function DialogForm(
  props: Omit<
    BtnDialogFormProps,
    "Component" | "btnVariant" | "open" | "toggle"
  > &
    FormAction,
) {
  const [open, toggle] = useToggle();
  return (
    <BtnDialogForm
      Component={Form}
      btnVariant={"default"}
      {...props}
      toggle={toggle}
      open={open}
    />
  );
}
