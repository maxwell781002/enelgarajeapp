import { getMessagesBulk } from "@repo/model/repository/whatsapp-connect";
import MessagesBulk from "@repo/ui/components/messages_bulk/index";

export default async function Page({
  params: { businessId },
}: {
  params: { businessId: string };
}) {
  const retrieveMessages = async (lastEvaluatedKey: string | null = null) => {
    "use server";
    return getMessagesBulk(businessId, lastEvaluatedKey);
  };
  const messages = await retrieveMessages();
  return (
    <MessagesBulk retrieveMessages={retrieveMessages} messages={messages} />
  );
}
