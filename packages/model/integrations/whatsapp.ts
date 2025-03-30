import {
  TCreateInstance,
  TMessage,
  TMessageBulk,
  TMessagesRetrieve,
  TRetrieveCode,
  UpdateChatListProps,
  UpdateSecureCodeProps,
} from "@repo/model/types/whatsapp-connect";

const doRequest = async (method: string, url: string, body: any = null) => {
  const data: any = {
    method,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "apk-key": process.env.CATALOG_BOT_APK_KEY as string,
    },
  };
  if (body) {
    data.body = JSON.stringify(body);
  }
  return fetch(`${process.env.BOT_WHATSAPP_URL}${url}`, data);
};

export const retrieveCode = async (data: TRetrieveCode) => {
  let retries = 3;
  while (retries > 0) {
    try {
      return (
        await doRequest("POST", `/instances/retrieve-code` as string, data)
      ).json();
    } catch (e) {
      retries--;
      console.log("Error retrieving code, retrying...", e);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  }
  throw new Error("Failed to retrieve code");
};

export const removeInstance = (phone: string) => {
  return doRequest("DELETE", `/instances/${phone}` as string);
};

export const createInstance = (
  data: TCreateInstance,
  id: string,
  secureCode: string,
) => {
  const body: {
    phone: string;
    data: Omit<UpdateSecureCodeProps, "paringCode">;
  } = {
    phone: data.phone,
    data: {
      id,
      secureCode,
    },
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
      sender_phone: message.senderPhone,
      media_url: message.mediaUrl,
    })),
    scheduled_time: messageBulk.scheduledTime,
    external_id: messageBulk.externalId,
  };
  console.log("Whatsapp data ==>", body);
  return doRequest("POST", url, body);
};

export const sendWhatsappMessages = async (message: TMessage) => {
  const url = "/instances/send-message";
  const body = {
    message: message.message,
    preview_link: message.previewLink,
    chat_id: message.chatId,
    sender_phone: message.senderPhone,
    media_url: message.mediaUrl,
  };
  console.log("Whatsapp data ==>", body);
  return doRequest("POST", url, body);
};

export const getMessages = async (
  externalId: string,
  lastEvaluatedKey: string | null,
) => {
  let url = `/messages/get-messages-bulk/${externalId}`;
  if (lastEvaluatedKey) {
    url = `${url}?last_evaluated_key=${lastEvaluatedKey}`;
  }
  const data: any = await (await doRequest("GET", url)).json();
  return {
    items: data.items,
    lastEvaluatedKey: data.last_evaluated_key,
  } as TMessagesRetrieve;
};

export const removeMessagesBulk = (scheduledTime: string) => {
  return doRequest(
    "DELETE",
    `/messages/remove-messages-bulk/${scheduledTime}` as string,
  );
};

export const getChatList = async (phone: string) => {
  return (await doRequest("GET", `/instances/get-chat-list/${phone}`)).json();
};

export const refreshChatList = (phone: string, id: string) => {
  const body: {
    phone: string;
    data: UpdateChatListProps;
  } = {
    phone,
    data: {
      id,
    },
  };
  return doRequest("POST", "/instances/refresh-chat-list" as string, body);
};
