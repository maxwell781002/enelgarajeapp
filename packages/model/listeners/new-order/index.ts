import { OrderSend } from "@repo/model/lib/event-emitter/events";
import { CompleteTelegramBusiness } from "@repo/model/prisma/zod/index";
import { CompleteOrder } from "@repo/model/prisma/zod/order";
import { orderRepository } from "@repo/model/repositories/order";
import { generateCollaboratorMessage } from "./collaborator";
import { generateCustomerMessage } from "./customer";

const HOST = "https://backoffice.enelgaraje.com";

export const sendOrderToTelegram = async (event: OrderSend) => {
  // TODO: To avoid send to telegram in testing
  const order = (await orderRepository.getAllData(
    event.data.id,
  )) as CompleteOrder;
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  const method = order.isCollaborator
    ? generateCollaboratorMessage
    : generateCustomerMessage;
  return Promise.all([
    sendToBusinessGroup(order, method(order, HOST)),
    sendToPrivateGroup(order, method(order, HOST)),
    sendToWhatsapp(order, method(order, HOST)),
  ]);
};

const sendToPrivateGroup = (order: CompleteOrder, message: string) => {
  if (!order.business?.sendOrderToWhatsapp) {
    return;
  }
  const message_whatsapp = `Hola%20tiene%20una%20nueva%20orden%20${order.identifier}`;
  message = `
${message}

*MANDAR MENSAJE AL NEGOCIO*
📱[Aplicación](https://api.whatsapp.com/send/?phone=${order.business?.phone}&text=${message_whatsapp}) 🌐[web](https://web.whatsapp.com/send?phone=${order.business?.phone}&text=${message_whatsapp})
`;

  return sendMessage({
    message,
    group_id: process.env.TELEGRAM_PRIVATE_GROUP,
    message_id: `${order.id}_private_group`,
  });
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
  console.log("BUSINESS_TESTING_ID", process.env.BUSINESS_TESTING_ID);
  if (order.businessId !== process.env.BUSINESS_TESTING_ID) {
    return;
  }
  if (!process.env.BOT_WHATSAPP_URL) {
    console.log("BOT_WHATSAPP_URL is not configured");
    return;
  }
  return fetch(process.env.BOT_WHATSAPP_URL as string, {
    method: "POST",
    body: JSON.stringify({
      message,
      id: process.env.BOT_WHATSAPP_TESTING_ID,
      type: "GROUP",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
