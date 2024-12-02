import Form, { FormAction } from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";

export function DialogForm(
  props: Omit<BtnDialogFormProps, "Component" | "btnVariant"> & FormAction,
) {
  return <BtnDialogForm Component={Form} btnVariant={"default"} {...props} />;
}
