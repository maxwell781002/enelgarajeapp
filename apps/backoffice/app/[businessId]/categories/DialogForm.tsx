"use client";

import { CompleteBusiness } from "@repo/model/zod/index";
import Form from "./form";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";
import UpgradePlan from "@repo/ui/components/upgrade-plan/index";
import { useTranslations } from "next-intl";
import { useToggle } from "@repo/ui/hooks/useToggle";

export type DialogFormProps = {
  isLimited?: boolean;
  business?: CompleteBusiness;
} & Omit<BtnDialogFormProps, "Component" | "btnVariant" | "open" | "toggle">;

export function DialogForm({
  isLimited = false,
  business,
  title,
  ...props
}: DialogFormProps) {
  const t = useTranslations("Category");
  const [open, toggle] = useToggle();
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
      toggle={toggle}
      open={open}
    />
  );
}
