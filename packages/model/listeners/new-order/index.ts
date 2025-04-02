import { OrderSend } from "@repo/model/lib/event-emitter/events";
import { CompleteTelegramBusiness } from "@repo/model/prisma/zod/index";
import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { orderRepository } from "@repo/model/repositories/order";
import {
  generateCollaboratorTelegramMessage,
  generateCollaboratorWhatsappMessage,
} from "./collaborator";
import {
  generateCustomerTelegramMessage,
  generateCustomerWhatsappMessage,
} from "./customer";
import { sendWhatsappMessages } from "../../integrations/whatsapp";

const HOST = "https://backoffice.enelgaraje.com";

export const sendOrderToTelegram = async (event: OrderSend) => {
  // TODO: To avoid send to telegram in testing
  const order = (await orderRepository.getAllData(
    event.data.id,
  )) as CompleteOrder;
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  const telegramMethod = order.isCollaborator
    ? generateCollaboratorTelegramMessage
    : generateCustomerTelegramMessage;

  const whatsappMethod = order.isCollaborator
    ? generateCollaboratorWhatsappMessage
    : generateCustomerWhatsappMessage;

  return Promise.all([
    sendToBusinessGroup(order, telegramMethod(order, HOST)),
    sendToWhatsapp(order, whatsappMethod(order, HOST)),
  ]);
};

const sendToBusinessGroup = (order: CompleteOrder, message: string) => {
  const telegram = order.business?.telegram as CompleteTelegramBusiness;
  if (!telegram) {
    return;
  }
  return sendMessage({
    message,
    group_id: telegram.groupId,
    message_id: `${order.id}_business_group`,
  });
};

const sendMessage = (message: any) => {
  return fetch(process.env.BOT_WEBHOOK_URL as string, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const sendToWhatsapp = (order: CompleteOrder, message: string) => {
  console.log("Whatsapp message ==>", message);
  if (!order.business?.whatsappGroupChatId) {
    return;
  }
  console.log("Whatsapp chatId ==>", order.business?.whatsappGroupChatId);
  return sendWhatsappMessages({
    chatId: order.business?.whatsappGroupChatId,
    message,
    senderPhone: process.env.PHONE_WHATSAPP_BOT as string,
    previewLink: false,
  });
};
