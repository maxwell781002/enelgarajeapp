import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import DetailPlan, {
  DetailProps,
} from "@repo/ui/components/upgrade-plan/detail";
import { Button } from "@repo/ui/components/ui/button";

export type UpgradePlanProps = {
  useDialog?: boolean;
  buttonText?: string;
} & DetailProps;

export default async function UpgradePlan({
  useDialog = false,
  buttonText,
  ...props
}: UpgradePlanProps) {
  const detail = <DetailPlan {...props} />;
  if (!useDialog) {
    return detail;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>{detail}</DialogContent>
    </Dialog>
  );
}
