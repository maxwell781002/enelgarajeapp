export enum ChatType {
  GROUP = "group",
  CHAT = "chat",
  CHANNEL = "channel",
}

export type TMessage = {
  chatId: string;
  message: string;
  senderPhone: string;
  chatType: ChatType;
  mediaUrl?: string;
  previewLink?: boolean;
};

export type TMessageBulk = {
  messages: TMessage[];
  scheduledTime: string;
  externalId: string;
};

export type TCreateInstance = {
  phone: string;
};

const doRequest = async (method: string, url: string, body: any) => {
  return fetch(`${process.env.BOT_WHATSAPP_URL}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
    },
  });
};

export const createInstance = (
  data: TCreateInstance,
  businessId: string,
  secureCode: string,
) => {
  const body = {
    phone: data.phone,
    webhook: `${process.env.WHATSAPP_WEBHOOK_RETURN}?businessId=${businessId}&secureCode=${secureCode}`,
  };
  return doRequest("POST", "/instances" as string, body);
};

export const sendWhatsappMessagesBulk = async (messageBulk: TMessageBulk) => {
  const url = "/instances/send-message-bulk";
  const body = {
    messages: messageBulk.messages.map((message) => ({
      message: message.message,
      preview_link: message.previewLink,
      chat_id: message.chatId,
      chat_type: message.chatType,
      sender_phone: message.senderPhone,
      media_url: message.mediaUrl,
    })),
    scheduled_time: messageBulk.scheduledTime,
    external_id: messageBulk.externalId,
  };
  console.log("Whatsapp data ==>", body);
  return doRequest("POST", url, body);
};
