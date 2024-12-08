import { useState } from "react";
import BankCardItem from "./item";
import { CompleteCollaboratorCardBank } from "@repo/model/zod/collaboratorcardbank";

const initialCards: any[] = [
  {
    id: "1",
    cardNumber: "**** **** **** 1234",
    alias: "Main Account",
    currency: "USD",
    phone: "+1 (555) 123-4567",
    updatedAt: "2023-04-01T12:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    cardNumber: "**** **** **** 5678",
    alias: "Savings",
    currency: "EUR",
    phone: "+44 20 7123 4567",
    updatedAt: "2023-03-15T09:30:00Z",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "3",
    cardNumber: "**** **** **** 9012",
    alias: "Business",
    currency: "GBP",
    phone: "+44 20 7234 5678",
    updatedAt: "2023-03-30T16:45:00Z",
    createdAt: "2023-01-15T00:00:00Z",
  },
  // Add more mock data as needed
];

export type NumbersBankListProps = {
  cards: CompleteCollaboratorCardBank[];
};

export default function NumbersBankList({ cards }: NumbersBankListProps) {
  const removeCard = async (id: string) => {
    "use server";
  };

  const openQRCode = async (cardNumber: string) => {
    "use server";
    // In a real application, you would generate a QR code here
    alert(`Opening QR code for card: ${cardNumber}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <BankCardItem
          key={card.id}
          card={card}
          removeCard={removeCard}
          openQRCode={openQRCode}
        />
      ))}
    </div>
  );
}
