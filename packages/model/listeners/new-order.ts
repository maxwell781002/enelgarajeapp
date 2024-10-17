import { CompleteOrder } from "../prisma/zod/order";

export const sendOrderToTelegram = (order: CompleteOrder) => {
  console.log(order);
};
