"use client";
import BankCardItem from "./item";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";
import { useOptimistic, useState } from "react";
import { transfermovilText } from "@repo/model/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@repo/ui/components/ui/dialog";
import Qr from "../qr";
import { useTranslations } from "next-intl";

export type NumbersBankListProps = {
  cards: CompleteCollaboratorCardBank[];
  remove: (id: string) => void;
};

export default function NumbersBankList({
  cards: originalCards,
  remove,
}: NumbersBankListProps) {
  const [cards, setCards] = useOptimistic(originalCards);
  const [qr, setQr] = useState<CompleteCollaboratorCardBank>();
  const text = transfermovilText(qr?.cardNumber as string, qr?.phone as string);
  const removeCard = (id: string) => {
    cards.splice(
      cards.findIndex((card) => card.id === id),
      1,
    );
    setCards([...cards]);
    return remove(id);
  };
  const t = useTranslations("CardBank");
  if (cards.length === 0) {
    return <h2 className="text-2xl font-semibold">{t("noCards")}</h2>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <BankCardItem
          key={card.id}
          card={card}
          removeCard={removeCard}
          selectCard={setQr}
        />
      ))}
      <Dialog open={!!qr} onOpenChange={() => setQr(undefined)}>
        <DialogContent>
          <DialogHeader>
            <Qr value={text} addCopy={true} image="/transfermovilIcon.jpg" />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
