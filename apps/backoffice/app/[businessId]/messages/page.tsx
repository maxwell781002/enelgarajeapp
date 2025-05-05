import {
  getMessagesBulk,
  removeMessagesBulk,
} from "@repo/model/repository/whatsapp-connect";
import MessagesBulk from "@repo/ui/components/messages_bulk/index";
import { revalidatePath } from "next/cache";

export default async function Page({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const retrieveMessages = async (lastEvaluatedKey: string | null = null) => {
    "use server";
    return getMessagesBulk(businessId, lastEvaluatedKey);
  };
  const removeMessage = async (scheduledTime: string) => {
    "use server";
    const result = await removeMessagesBulk(scheduledTime);
    if (result) {
      revalidatePath(`/${businessId}/messages`);
    }
    return result;
  };

  const messages = await retrieveMessages();
  return (
    <MessagesBulk
      retrieveMessages={retrieveMessages}
      messages={messages}
      removeMessage={removeMessage}
    />
  );
}
