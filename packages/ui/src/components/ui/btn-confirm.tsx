import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { Button, ButtonProps } from "@repo/ui/components/button";
import { useState, useTransition } from "react";

export type BtnConfirmProps = {
  btnIcon?: React.ReactNode;
  btnText?: string;
  title: string;
  description: string;
  btnCancelText?: string;
  btnContinueText?: string;
  action: () => any;
  btnAttr?: Omit<ButtonProps, "children">;
};

export function BtnConfirm({
  btnIcon,
  btnText,
  title,
  description,
  action,
  btnAttr,
  btnCancelText = "Cancel",
  btnContinueText = "Continue",
}: BtnConfirmProps) {
  const [loading, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const handle = async () => {
    return startTransition(async () => {
      await action();
      setOpen(false);
    });
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size={btnIcon ? "icon" : "default"}
          {...btnAttr}
          onClick={() => setOpen(true)}
        >
          {btnIcon || btnText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            {btnCancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handle} disabled={loading}>
            {btnContinueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
