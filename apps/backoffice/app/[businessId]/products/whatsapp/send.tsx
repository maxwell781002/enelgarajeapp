"use client";

import { Button } from "@repo/ui/components/button";
import { useTranslations } from "next-intl";
import { useStore } from "./store";

export default function SendToWhatsapp() {
  const totalProducts = useStore((state) => state.totalProducts());
  const t = useTranslations("Product");
  if (!totalProducts) {
    return;
  }
  return (
    <Button variant="outline">
      {t("sendToWhatsappBtn")}: {totalProducts}
    </Button>
  );
}
