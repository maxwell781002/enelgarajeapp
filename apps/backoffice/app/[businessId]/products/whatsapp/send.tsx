"use client";

import { useTranslations } from "next-intl";
import { useStore } from "./store";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";

export default function SendToWhatsapp() {
  const t = useTranslations("Product");
  const totalProducts = useStore((state) => state.totalProducts());
  if (!totalProducts) {
    return;
  }
  return (
    <Link href="products/whatsapp">
      <Button variant="outline">
        {t("sendToWhatsappBtn")}: {totalProducts}
      </Button>
    </Link>
  );
}
