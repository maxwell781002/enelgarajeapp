"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { QrCode } from "lucide-react";
import { formatDate } from "@repo/ui/lib/date";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";
import { useTranslations } from "next-intl";
import CopyToClipboard from "../copy-to-clipboard/copy-to-clipboard-text";
import { BtnRemove } from "../ui/btn-remove";

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
          <BtnRemove
            action={() => removeCard(card.id as string)}
            entityId={card.id}
            title={t("remove")}
            description={t("removeDescription")}
            btnContinueText={t("removeContinue")}
            btnCancelText={t("removeCancel")}
          />
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
            <dd>{formatDate(card.updatedAt as Date)}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("createdAt")}</dt>
            <dd>{formatDate(card.createdAt as Date)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
