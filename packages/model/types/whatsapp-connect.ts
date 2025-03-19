export type TMessage = {
  chatId: string;
  message: string;
  senderPhone: string;
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

export type UpdateSecureCodeProps = {
  id: string;
  secureCode: string;
  paringCode: string;
};
