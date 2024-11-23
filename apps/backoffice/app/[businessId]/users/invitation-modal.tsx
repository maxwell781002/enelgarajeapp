import { CompleteBusiness } from "@repo/model/zod/business";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";
import { useTranslations } from "next-intl";
import GenerateLink from "./generate-link";

export type CreateInvitationProps = {
  business: CompleteBusiness;
  hasPlan: boolean;
};

export function CreateInvitation({ business, hasPlan }: CreateInvitationProps) {
  const t = useTranslations("User");
  if (!hasPlan) {
    return (
      <UpgradePlan
        business={business}
        title={t("upgrade_plan_title")}
        buttonText={t("invitation.title")}
        useDialog
      />
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("invitation.title")}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("invitation.title")}</DialogTitle>
          <DialogDescription>{t("invitation.description")}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GenerateLink businessId={business.id} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">{t("invitation.close")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
