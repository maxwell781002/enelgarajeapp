"use client";

import PriceDisplay from "@repo/ui/components/prices/price";
import { useStore } from "../useStore";
import { Button } from "@repo/ui/components/button";
import { useTranslations } from "next-intl";

export default function NewInvoice() {
  const t = useTranslations("UserDetail");
  const totalToPay = useStore((state) => state.totalToPay());
  if (!totalToPay) return null;
  return (
    <div className="flex flex-col items-end pt-5">
      <PriceDisplay price={totalToPay} />
      <Button>{t("createInvoice")}</Button>
    </div>
  );
}
