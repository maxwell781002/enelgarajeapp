import { formatPrice } from "../lib/utils";
import { CompleteOrderProduct, CompleteTelegramBusiness } from "../prisma/zod";
import { CompleteOrder } from "../prisma/zod/order";
import { orderRepository } from "../repositories/order";

export const sendOrderToTelegram = async (order: CompleteOrder) => {
  // TODO: To avoid send to telegram in testing
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  const orderAllData = (await orderRepository.getAllData(
    order.id,
  )) as CompleteOrder;
  const telegram = orderAllData.business?.telegram as CompleteTelegramBusiness;
  if (!telegram) {
    return;
  }
  const customer = orderAllData.user;
  const message = {
    message_id: orderAllData.id,
    group_id: telegram.groupId,
    message_type: "new_order",
    message: {
      order_url: `https://backoffice.enelgaraje.com/${order.id}/orders/${order.id}`,
      customer: {
        id: customer?.id,
        name: customer?.name,
        phone: customer?.phone,
      },
      items: orderAllData.items.map((item: CompleteOrderProduct) => ({
        id: item.product.id,
        name: item.product.name,
        price: formatPrice(item.price),
        quantity: item.quantity,
      })),
      total: formatPrice(orderAllData.total),
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
