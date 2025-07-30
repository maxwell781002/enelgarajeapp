"use client";

import { IS_WHOLESALE, wholesaleContext } from "apps/web/context/wholesale";
import { useTranslations } from "next-intl";
import { useContext } from "react";

export default function WholesaleMessage() {
  const t = useTranslations("Wholesale");
  const { wholesale } = useContext(wholesaleContext);
  if (wholesale !== IS_WHOLESALE.YES) {
    return null;
  }
  return (
    <div className="w-full pt-2">
      <div className="container text-center text-sm text-primary font-medium">
        ⭐️ {t("messageHeader")} ⭐️
      </div>
    </div>
  );
}
