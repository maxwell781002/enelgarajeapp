import { CompleteOrder } from "../prisma/zod/order";

export const sendOrderToTelegram = (order: CompleteOrder) => {
  if (!process.env.BOT_WEBHOOK_URL) {
    return;
  }
  console.log(order);
};
