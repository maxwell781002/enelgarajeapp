"use client";

import { TMessagesRetrieve } from "@repo/model/types/whatsapp-connect";
import { useState } from "react";
import { useTransition } from "react";
import { TableMessages } from "@repo/ui/components/messages_bulk/table";
import MessageBulkDetail from "@repo/ui/components/messages_bulk/detail";

export type MessagesBulkProps = {
  retrieveMessages: (lastEvaluatedKey?: string | null) => Promise<any>;
  removeMessage: (scheduledTime: string) => Promise<any>;
  messages: TMessagesRetrieve;
};

export default function MessagesBulk({
  retrieveMessages,
  removeMessage,
  messages,
}: MessagesBulkProps) {
  const [messagesBulk, setMessagesBulk] = useState<TMessagesRetrieve>(messages);
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
  const [selected, setSelected] = useState<string | null>(null);
  const [removing, startRemoving] = useTransition();
  const handleRemove = (
    scheduledTime: string,
    onSuccess?: () => void,
    onError?: () => void,
  ) => {
    startRemoving(async () => {
      if (await removeMessage(scheduledTime)) {
        setMessagesBulk((prev) => ({
          ...prev,
          items: prev.items.filter(
            (item) => item.scheduled_time !== scheduledTime,
          ),
        }));
        setSelected(null);
        onSuccess?.();
      } else {
        onError?.();
      }
    });
  };
  if (selected) {
    return (
      <MessageBulkDetail
        onSelect={setSelected}
        messageBulk={selected}
        remove={handleRemove}
        removing={removing}
      />
    );
  }
  return (
    <TableMessages
      messages={messagesBulk}
      hasMore={!!messagesBulk.lastEvaluatedKey}
      loadMore={handleGetMore}
      loading={loading}
      onSelect={setSelected}
    />
  );
}
