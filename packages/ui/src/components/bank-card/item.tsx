"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Trash2, QrCode, Copy } from "lucide-react";
import { formatDate } from "@repo/ui/lib/date";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";
import { useTranslations } from "next-intl";
import CopyToClipboard from "../copy-to-clipboard/copy-to-clipboard-text";

export type BankCardItemProps = {
  card: CompleteCollaboratorCardBank;
  removeCard: (id: string) => void;
  selectCard: (item: CompleteCollaboratorCardBank) => void;
};

export default function BankCardItem({
  card,
  removeCard,
  selectCard,
}: BankCardItemProps) {
  const t = useTranslations("CardBankItem");
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">
          {(card.alias || card.cardNumber) as string}
        </CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => selectCard(card)}
            aria-label="Open QR Code"
          >
            <QrCode className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeCard(card.id as string)}
            aria-label="Remove Card"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="font-medium">{t("cardNumber")}</dt>
            <dd>
              <CopyToClipboard text={card.cardNumber as string} />
            </dd>
          </div>
          <div>
            <dt className="font-medium">{t("currency")}</dt>
            <dd>{card.currency as string}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("phone")}</dt>
            <dd>
              <CopyToClipboard text={card.phone as string} />
            </dd>
          </div>
          <div>
            <dt className="font-medium">{t("updatedAt")}</dt>
            <dd>{formatDate(new Date(card.updatedAt as string))}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("createdAt")}</dt>
            <dd>{formatDate(new Date(card.createdAt as string))}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
