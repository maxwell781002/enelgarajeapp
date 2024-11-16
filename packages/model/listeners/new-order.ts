import { OrderSend } from "../lib/event-emitter/events";
import { formatPrice, normalizePhone } from "../lib/utils";
import {
  CompleteOrderProduct,
  CompleteProduct,
  CompleteTelegramBusiness,
} from "../prisma/zod";
import { CompleteOrder } from "../prisma/zod/order";
import { orderRepository } from "../repositories/order";

const HOST = "https://backoffice.enelgaraje.com";

export const sendOrderToTelegram = async (event: OrderSend) => {
  // TODO: To avoid send to telegram in testing
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  const order = (await orderRepository.getAllData(
    event.data.id,
  )) as CompleteOrder;
  const customer = order.user;
  const message = {
    order_url: `${HOST}/${order.businessId}/orders/${order.id}`,
    businessId: order.businessId,
    identifier: order.identifier,
    shipping: order.shipping,
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
  };
  return Promise.all([
    sendToBusinessGroup(order, message),
    sendToPrivateGroup(order, message),
  ]);
};

const generateText = (data: any) => {
  const message_whatsapp = "Hola%20ha%20comprado%20en%20nuestra%20tienda";
  const productUrl = (item: CompleteProduct) =>
    `${HOST}/${data.businessId}/products/${item.id}`;
  const products = data.items
    .map(
      (item: any) =>
        `👉 [${item.name}](${productUrl(item)}) - ${item.price} - ${item.quantity}`,
    )
    .join("\n");
  return `
🛒 *Nueva orden*

*Cliente*: ${data.customer.name}
*Teléfono*: ${data.customer.phone}
*Whatsapp*
📱[Aplicación](https://api.whatsapp.com/send/?phone=${data.customer.phone}&text=${message_whatsapp}) 🌐[web](https://web.whatsapp.com/send?phone=${data.customer.phone}&text=${message_whatsapp})
*Productos*
${products}

🚚 ${data.shipping > 0 ? "✅ Pagó el envío" : "❌ No pagó el envío"}
*Total*: ${data.total}

🔗[${data.identifier}](${data.order_url})

🎉🎉🎉
`;
};

const sendToPrivateGroup = (order: CompleteOrder, data: any) => {
  if (!order.business?.sendOrderToWhatsapp) {
    return;
  }
  const message_whatsapp = `Hola%20tiene%20una%20nueva%20orden%20${order.identifier}`;
  const message = `
${generateText(data)}

*MANDAR MENSAJE AL NEGOCIO*
📱[Aplicación](https://api.whatsapp.com/send/?phone=${order.business?.phone}&text=${message_whatsapp}) 🌐[web](https://web.whatsapp.com/send?phone=${order.business?.phone}&text=${message_whatsapp})
`;

  return sendMessage({
    message,
    group_id: process.env.TELEGRAM_PRIVATE_GROUP,
    message_id: `${order.id}_private_group`,
  });
};

const sendToBusinessGroup = (order: CompleteOrder, data: any) => {
  const telegram = order.business?.telegram as CompleteTelegramBusiness;
  if (!telegram) {
    return;
  }
  const message = generateText(data);
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
