"use client";

import { Button } from "@repo/ui/components/button";
import { IS_WHOLESALE, wholesaleContext } from "apps/web/context/wholesale";
import { useContext } from "react";
import { useTranslations } from "next-intl";

export default function WholesaleButton() {
  const t = useTranslations("Wholesale");
  const { wholesale, clearAndOpen } = useContext(wholesaleContext);
  return (
    <Button variant="outline" className="w-full" onClick={clearAndOpen}>
      {wholesale == IS_WHOLESALE.YES
        ? t("deactivateWholesale")
        : t("activateWholesale")}
    </Button>
  );
}
