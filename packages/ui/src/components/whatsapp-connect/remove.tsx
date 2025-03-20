"use client";

import { CompleteBusiness } from "@repo/model/zod/business";
import {
  BtnDialogForm,
  BtnDialogFormProps,
} from "@repo/ui/components/ui/btn-dialog-form";
import { useTranslations } from "next-intl";
import { Button } from "@repo/ui/components/button";

export type RemoveWhatsappConnectContentProps = {
  business: CompleteBusiness;
  isRemoving: boolean;
  remove: () => any;
};

function RemoveWhatsappConnectContent({
  isRemoving,
  remove,
}: RemoveWhatsappConnectContentProps) {
  const t = useTranslations("Business");
  const doRemove = async () => {
    await remove();
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

export type RemoveWhatsappConnectProps = BtnDialogFormProps &
  RemoveWhatsappConnectContentProps;

export default function RemoveWhatsappConnect(
  props: RemoveWhatsappConnectProps,
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
