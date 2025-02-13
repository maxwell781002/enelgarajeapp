"use client";

import { useWhatsAppConnect } from "@repo/ui/hooks/whatsapp-connect";
import { CompleteBusiness } from "@repo/model/zod/business";
import { AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import AlertMessage from "@repo/ui/components/alert-message";
import ShowData from "@repo/ui/components/show-data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { BtnDialogForm } from "@repo/ui/components/ui/btn-dialog-form";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import Content, {
  ContentProps,
} from "@repo/ui/components/whatsapp-connect/content";

export function WhatsappConnect({ business }: ContentProps) {
  const t = useTranslations("Business");
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-1">
          <div>
            <CardTitle>{t("tabWhatsapp")}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Content business={business} />
      </CardContent>
    </Card>
  );
}
