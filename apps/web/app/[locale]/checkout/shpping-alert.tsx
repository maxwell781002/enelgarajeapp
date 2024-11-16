"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@repo/ui/components/ui/alert";
import { Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ShippingAlert() {
  const t = useTranslations("Checkout");
  return (
    <Alert className="relative max-w-lg mx-auto bg-green-100 border-green-300 dark:bg-green-900 dark:border-green-700">
      <Truck className="h-4 w-4 text-green-600 dark:text-green-400" />
      <AlertTitle className="text-green-800 dark:text-green-100">
        {t("shipping_suggestion")}
      </AlertTitle>
      <AlertDescription className="text-green-700 dark:text-green-200">
        {t("shipping_suggestion_text")}
      </AlertDescription>
    </Alert>
  );
}
