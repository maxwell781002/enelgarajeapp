"use client";
import BankCardItem from "./item";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";
import { useState } from "react";
import { transfermovilText } from "@repo/model/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@repo/ui/components/ui/dialog";
import Qr from "../qr";

export type NumbersBankListProps = {
  cards: CompleteCollaboratorCardBank[];
};

export default function NumbersBankList({ cards }: NumbersBankListProps) {
  const [qr, setQr] = useState<CompleteCollaboratorCardBank>();
  const text = transfermovilText(qr?.cardNumber as string, qr?.phone as string);
  const removeCard = async (id: string) => {
    // "use server";
  };
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
