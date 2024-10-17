import { OrderSend } from "../lib/event-emitter/events";
import { formatPrice, normalizePhone } from "../lib/utils";
import { CompleteOrderProduct, CompleteTelegramBusiness } from "../prisma/zod";
import { CompleteOrder } from "../prisma/zod/order";
import { orderRepository } from "../repositories/order";

export const sendOrderToTelegram = async (event: OrderSend) => {
  // TODO: To avoid send to telegram in testing
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  const order = (await orderRepository.getAllData(
    event.data.id,
  )) as CompleteOrder;
  const telegram = order.business?.telegram as CompleteTelegramBusiness;
  if (!telegram) {
    return;
  }
  const customer = order.user;
  const message = {
    message_id: order.id,
    group_id: telegram.groupId,
    message_type: "new_order",
    message: {
      order_url: `https://backoffice.enelgaraje.com/${order.businessId}/orders/${order.id}`,
      customer: {
        id: customer?.id,
        name: customer?.name,
        phone: normalizePhone(customer?.phone),
      },
      items: order.items.map((item: CompleteOrderProduct) => ({
        id: item.product.id,
        name: item.product.name,
        price: formatPrice(item.price),
        quantity: item.quantity,
      })),
      total: formatPrice(order.total),
    },
  };
  return fetch(process.env.BOT_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(message),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
