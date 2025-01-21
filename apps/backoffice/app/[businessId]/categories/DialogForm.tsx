import { CompleteBusiness } from "@repo/model/zod/index";
import Form from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";
import { useTranslations } from "next-intl";

export type DialogFormProps = {
  isLimited?: boolean;
  business?: CompleteBusiness;
} & Omit<BtnDialogFormProps, "Component" | "btnVariant">;

export function DialogForm({
  isLimited = false,
  business,
  title,
  ...props
}: Omit<BtnDialogFormProps, "Component" | "btnVariant">) {
  const t = useTranslations("Category");
  if (business && isLimited) {
    return (
      <UpgradePlan
        business={business}
        title={t("upgrade_plan_title")}
        buttonText={title}
        useDialog
      />
    );
  }
  return (
    <BtnDialogForm
      Component={Form}
      {...props}
      title={title}
      btnVariant={"default"}
    />
  );
}
