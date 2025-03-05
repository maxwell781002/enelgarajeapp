"use client";
import { TMessagesRetrieve } from "@repo/model/types/whatsapp-connect";
import { useState } from "react";
import MessagesBulkItem from "@repo/ui/components/messages_bulk/message";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { useTranslations } from "next-intl";
import ShowMore from "@repo/ui/components/show-more";
import { useTransition } from "react";

export type MessagesBulkProps = {
  retrieveMessages: (lastEvaluatedKey?: string | null) => Promise<any>;
  messages: TMessagesRetrieve;
};

export default function MessagesBulk({
  retrieveMessages,
  messages,
}: MessagesBulkProps) {
  const [messagesBulk, setMessagesBulk] = useState<TMessagesRetrieve>(messages);
  const t = useTranslations("MessageBulk");
  const [loading, startLoading] = useTransition();
  const handleGetMore = () => {
    startLoading(async () => {
      const newMessages = await retrieveMessages(messagesBulk.lastEvaluatedKey);
      setMessagesBulk({
        ...messagesBulk,
        items: [...messagesBulk.items, ...newMessages.items],
        lastEvaluatedKey: newMessages.lastEvaluatedKey,
      });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("messageTitle")}</CardTitle>
        <CardDescription>{t("messageDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pr-4 -mr-4 flex flex-wrap gap-2">
          {messagesBulk.items.map((message: any) => (
            <MessagesBulkItem
              key={message.scheduled_time}
              messageBulk={message}
            />
          ))}
        </div>
        {messagesBulk.lastEvaluatedKey && (
          <div className="w-full flex justify-end">
            <ShowMore onClick={handleGetMore} disabled={loading}>
              Ver más
            </ShowMore>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
