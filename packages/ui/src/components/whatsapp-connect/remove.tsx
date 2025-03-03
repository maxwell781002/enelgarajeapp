"use client";

import { CompleteBusiness } from "@repo/model/zod/business";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import { useTranslations } from "next-intl";
import { Button } from "@repo/ui/components/button";

export type RemoveWhatsappConnectContentProps = {
  business: CompleteBusiness;
  isRemoving: boolean;
  remove: (afterRemove?: () => void) => any;
  toggleDialog?: () => void;
};

function RemoveWhatsappConnectContent({
  isRemoving,
  remove,
  toggleDialog,
}: RemoveWhatsappConnectContentProps) {
  const t = useTranslations("Business");
  const doRemove = async () => {
    await remove(() => toggleDialog?.());
  };
  return (
    <>
      {t("disconnectWhatsappMessage")}
      <Button loading={isRemoving} variant={"default"} onClick={doRemove}>
        {t("disconnectWhatsapp")}
      </Button>
    </>
  );
}

export default function RemoveWhatsappConnect(
  props: RemoveWhatsappConnectContentProps,
) {
  const t = useTranslations("Business");
  return (
    <BtnDialogForm
      Component={RemoveWhatsappConnectContent}
      title={t("disconnectWhatsapp")}
      btnVariant={"destructive"}
      {...props}
    />
  );
}
