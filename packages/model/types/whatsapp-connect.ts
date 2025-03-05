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

export type TRetrieveCode = {
  phone: string;
};

export type TMessagesRetrieve = {
  items: any[];
  lastEvaluatedKey: string;
};
