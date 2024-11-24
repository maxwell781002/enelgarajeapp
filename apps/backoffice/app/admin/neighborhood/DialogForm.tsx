import Form from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";

export function DialogForm({
  ...props
}: Omit<BtnDialogFormProps, "Component" | "btnVariant">) {
  return <BtnDialogForm Component={Form} {...props} btnVariant={"default"} />;
}
