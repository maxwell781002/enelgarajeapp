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
import { Button, ButtonProps } from "@repo/ui/components/ui/button";

export type BtnConfirmProps = {
  btnIcon?: React.ReactNode;
  btnText?: string;
  title: string;
  description: string;
  btnCancelText?: string;
  btnContinueText?: string;
  action: () => any;
  btnAttr?: ButtonProps;
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size={btnIcon ? "icon" : "default"}
          {...btnAttr}
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
          <AlertDialogCancel>{btnCancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={action}>
            {btnContinueText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
